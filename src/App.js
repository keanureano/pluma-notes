import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

function App() {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");

  const onTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const onTextChange = (event) => {
    setNewText(event.target.value);
  };
  const getNotes = async () => {
    const q = query(collection(db, "notes"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const addNote = (event) => {
    event.preventDefault();
    addDoc(collection(db, "notes"), {
      title: newTitle,
      text: newText,
      timestamp: Timestamp.now().seconds,
    });
    setNewTitle("");
    setNewText("");
    getNotes();
  };
  const deleteNote = (id) => {
    const noteDoc = doc(db, "notes", id);
    deleteDoc(noteDoc);
    setNotes(notes.filter((note) => (note.id === noteDoc.id ? null : note)));
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <Form
        newTitle={newTitle}
        newText={newText}
        onTitleChange={onTitleChange}
        onTextChange={onTextChange}
        addNote={addNote}
      />
      <Notes notes={notes} deleteNote={deleteNote} />
    </div>
  );
}

function Form({ addNote, newTitle, newText, onTitleChange, onTextChange }) {
  return (
    <div>
      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="title"
          value={newTitle}
          onChange={onTitleChange}
        />
        <input
          type="text"
          placeholder="text"
          value={newText}
          onChange={onTextChange}
        />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
}

function Notes({ notes, deleteNote }) {
  return (
    <div>
      {notes.map((note) => {
        return (
          <div key={note.id}>
            <button onClick={() => deleteNote(note.id)}>x</button>
            <h6>{note.title}</h6>
            <p>{note.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
