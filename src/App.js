import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

function App() {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const q = query(collection(db, "notes"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log("get note");
  };
  const addNote = () => {
    addDoc(collection(db, "notes"), {
      title: "",
      text: "",
      timestamp: Timestamp.now().seconds,
    });
    getNotes();
    console.log("added note");
  };
  const deleteNote = (event) => {
    const noteId = event.target.value;
    const noteDoc = doc(db, "notes", noteId);
    deleteDoc(noteDoc);
    setNotes(notes.filter((note) => (note.id === noteDoc.id ? null : note)));
    console.log("deleted note", noteId);
  };
  const editNote = (event) => {
    event.preventDefault();
    const noteId = event.target.id.value;
    const noteTitle = event.target.title.value;
    const noteText = event.target.text.value;
    const editedNote = {};
    const existingNote = notes.find((note) => note.id === noteId);
    if (existingNote.title !== noteTitle) {
      editedNote.title = noteTitle;
    }
    if (existingNote.text !== noteText) {
      editedNote.text = noteText;
    }
    if (Object.keys(editedNote).length === 0) {
      return;
    }
    updateDoc(doc(db, "notes", noteId), editedNote);
    console.log("updated note", noteId);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <AddNote addNote={addNote} />
      <Notes notes={notes} deleteNote={deleteNote} editNote={editNote} />
    </div>
  );
}

function AddNote({ addNote }) {
  return (
    <div>
      <button onClick={addNote}>Add Note</button>
    </div>
  );
}

function Notes({ notes, deleteNote, editNote }) {
  return (
    <div>
      {notes.map((note) => {
        return (
          <div key={note.id} className="note">
            <button onClick={deleteNote} value={note.id}>
              x
            </button>
            <form
              onSubmit={editNote}
              onBlur={(e) => e.target.form.requestSubmit()}
            >
              <input name="id" type="hidden" value={note.id} />
              <input
                name="title"
                placeholder="Title"
                defaultValue={note.title}
              />
              <textarea
                rows="10"
                cols="21"
                name="text"
                placeholder="Note"
                defaultValue={note.text}
              />
            </form>
          </div>
        );
      })}
    </div>
  );
}

function Note({ note }) {}

export default App;
