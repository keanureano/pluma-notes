import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  onSnapshot,
  doc,
  getDocs,
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
  const getNotes = async () => {
    console.log("get");
    const snapshot = await getDocs(collection(db, "notes"));
    setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const addNote = (event) => {
    event.preventDefault();
    setNewTitle("");
    setNewText("");
    addDoc(collection(db, "notes"), { title: newTitle, text: newText });
    getNotes();
  };
  const deleteNote = (event) => {
    const noteDoc = doc(db, "notes", event.target.dataset.id);
    deleteDoc(noteDoc);
    getNotes();
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
