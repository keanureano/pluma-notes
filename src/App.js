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
    <div className="container">
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
    <form className="col-3" onSubmit={addNote}>
      <input
        type="text"
        className="form-control mt-1"
        placeholder="title"
        value={newTitle}
        onChange={onTitleChange}
      />
      <input
        type="text"
        className="form-control mt-1"
        placeholder="text"
        value={newText}
        onChange={onTextChange}
      />
      <button type="submit" className="btn btn-primary mt-1">
        Add Note
      </button>
    </form>
  );
}

function Notes({ notes, deleteNote }) {
  return (
    <div className="row gx-5">
      {notes.map((note) => {
        return (
          <div className="col-4 card p-0" key={note.id}>
            <div className="card-body">
              <button className="btn-close float-end" data-id={note.id} onClick={deleteNote} />
              <h1>{note.title}</h1>
              <p>{note.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
