import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function getNotes() {
      const notesColRef = collection(db, "notes");
      const data = await getDocs(notesColRef);
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getNotes();
  }, []);

  return (
    <div>
      <form className="addnote">
      <input type="text" placeholder="title"></input>
      <input type="text" placeholder="text"></input>
        <button type="submit">Add Note</button>
      </form>

      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
}

function Note({ note }) {
  return (
    <div className="note">
      <h1>{note.title}</h1>
      <p>{note.text}</p>
    </div>
  );
}

export default App;
