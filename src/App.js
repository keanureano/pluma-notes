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
  const deleteNote = (id) => {
    const noteDoc = doc(db, "notes", id);
    deleteDoc(noteDoc);
    setNotes(notes.filter((note) => (note.id === noteDoc.id ? null : note)));
    console.log("deleted note");
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
    console.log("updated note");
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <AddNote
        addNote={addNote}
      />
      <Notes notes={notes} deleteNote={deleteNote} editNote={editNote} />
    </div>
  );
}

function AddNote({ addNote }) {
  return (
    <div>
      <button onClick={addNote}>add Note</button>
    </div>
  );
}

function Notes({ notes, deleteNote, editNote }) {
  return (
    <div>
      {notes.map((note) => {
        return (
          <div key={note.id}>
            <button onClick={() => deleteNote(note.id)}>x</button>
            <form onSubmit={editNote}>
              <input name="id" type="hidden" value={note.id} />
              <input
                name="title"
                defaultValue={note.title}
                onBlur={(e) => e.target.form.requestSubmit()}
              />
              <input
                name="text"
                defaultValue={note.text}
                onBlur={(e) => e.target.form.requestSubmit()}
              />
            </form>
          </div>
        );
      })}
    </div>
  );
}

export default App;
