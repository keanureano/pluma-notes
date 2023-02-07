import React, { useState, useEffect } from "react";
import { db, auth, loginUser, logoutUser } from "./firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";

function App() {
  const [notes, setNotes] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  const getNotes = async () => {
    const q = query(
      collection(db, "notes"),
      where("owner", "==", user.uid),
      orderBy("timestamp", "desc")
    );
    const snapshot = await getDocs(q);
    setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log("get note");
  };
  const addNote = () => {
    addDoc(collection(db, "notes"), {
      title: "",
      text: "",
      owner: user.uid,
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
    if (user) {
      getNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  if (loading) {
    return <LoadingPage />;
  }
  if (error) {
    return <ErrorPage message={error} />;
  }
  if (!user) {
    return <LoginPage />;
  }
  if (user) {
    return (
      <MainPage
        user={user}
        addNote={addNote}
        notes={notes}
        deleteNote={deleteNote}
        editNote={editNote}
      />
    );
  }
}

function MainPage({ user, addNote, notes, deleteNote, editNote }) {
  return (
    <div className="main">
      <div>
        <button onClick={logoutUser}>Logout {user.displayName}</button>
      </div>
      <button onClick={addNote}>Add Note</button>
      <Notes notes={notes} deleteNote={deleteNote} editNote={editNote} />
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
        <textarea name="text" placeholder="Note" defaultValue={note.text} />
      </form>
    </div>
  );
}

function LoadingPage() {
  return null;
}

function ErrorPage({ message }) {
  return <div>error: {message}</div>;
}

function LoginPage() {
  return <button onClick={loginUser}>Sign In With Google</button>;
}

export default App;
