import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.css";

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
  const addNote = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, "notes"), { title: newTitle, text: newText });
    setNewTitle("");
    setNewText("");
  };
  const deleteNote = async (event) => {
    const noteDoc = doc(db, "notes", event.target.dataset.id);
    await deleteDoc(noteDoc);
  };

  useEffect(() => {
    onSnapshot(collection(db, "notes"), (data) => {
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  return (
    <div>
      <Notes notes={notes} deleteNote={deleteNote} />
      <Form
        newTitle={newTitle}
        newText={newText}
        onTitleChange={onTitleChange}
        onTextChange={onTextChange}
        addNote={addNote}
      />
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
            <button data-id={note.id} onClick={deleteNote}>
              x
            </button>
            <h1>{note.title}</h1>
            <p>{note.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
