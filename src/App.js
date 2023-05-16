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
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import LoadingPage from "./components/LoadingPage";
import ErrorPage from "./components/ErrorPage";

function App() {
  const [notes, setNotes] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  const getNotes = async () => {
    const q = query(
      collection(db, "notes"),
      where("owner.id", "==", user.uid),
      orderBy("timestamp", "desc")
    );
    const snapshot = await getDocs(q);
    setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log("get note");
  };
  const getAllNotes = async () => {
    const q = query(collection(db, "notes"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    setNotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log("get all notes");
  };
  const addNote = () => {
    addDoc(collection(db, "notes"), {
      title: "",
      text: "",
      owner: { id: user.uid, name: user.displayName },
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
  }, [user]);
  if (loading) {
    return <LoadingPage />;
  }
  if (error) {
    return <ErrorPage message={error} />;
  }
  if (!user) {
    return <LoginPage loginUser={loginUser} />;
  }
  if (user) {
    return (
      <HomePage
        user={user}
        getAllNotes={getAllNotes}
        addNote={addNote}
        notes={notes}
        deleteNote={deleteNote}
        editNote={editNote}
        logoutUser={logoutUser}
      />
    );
  }
}

export default App;
