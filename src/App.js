import React, { useState, useEffect } from "react";
import { db, auth, loginUser, logoutUser } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
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
  const [user, setUser] = useState(null);
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
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <div className="app">
      <Auth user={user} />
      <Content
        user={user}
        addNote={addNote}
        notes={notes}
        deleteNote={deleteNote}
        editNote={editNote}
      />
    </div>
  );
}

function Auth({ user }) {
  return (
    <div className="auth">
      {user ? (
        <button onClick={logoutUser}>Logout {user.displayName}</button>
      ) : (
        <button onClick={loginUser}>Sign In With Google</button>
      )}
    </div>
  );
}

function Content({ user, addNote, notes, deleteNote, editNote }) {
  if (!user) {
    return null;
  }
  return (
    <div className="content">
      <AddNote addNote={addNote} />
      <Notes notes={notes} deleteNote={deleteNote} editNote={editNote} />
    </div>
  );
}

function AddNote({ addNote }) {
  return (
    <div className="addNote">
      <button onClick={addNote}>Add Note</button>
    </div>
  );
}

function Notes({ notes, deleteNote, editNote }) {
  return (
    <div className="notes">
      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            editNote={editNote}
          />
        );
      })}
    </div>
  );
}

function Note({ note, deleteNote, editNote }) {
  return (
    <div className="note">
      <button onClick={deleteNote} value={note.id}>
        x
      </button>
      <form onSubmit={editNote} onBlur={(e) => e.target.form.requestSubmit()}>
        <input name="id" type="hidden" value={note.id} />
        <input name="title" placeholder="Title" defaultValue={note.title} />
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
}

export default App;
