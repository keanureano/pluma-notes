export default function HomePage({
  user,
  getAllNotes,
  addNote,
  notes,
  deleteNote,
  editNote,
  logoutUser,
}) {
  return (
    <div className="main">
      <div>
        <button onClick={logoutUser}>Logout {user.displayName}</button>
        <button onClick={getAllNotes}>
          See all user notes (For test purposes only)
        </button>
      </div>
      <button onClick={addNote}>Add Note</button>
      <Notes
        user={user}
        notes={notes}
        deleteNote={deleteNote}
        editNote={editNote}
      />
    </div>
  );
}

function Notes({ user, notes, deleteNote, editNote }) {
  return (
    <div className="notes">
      {notes.map((note) => {
        return (
          <Note
            user={user}
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

function Note({ user, note, deleteNote, editNote }) {
  console.log();
  return (
    <div className="note">
      <button
        onClick={deleteNote}
        value={note.id}
        hidden={user.uid !== note.owner.id}
      >
        x
      </button>

      <form onSubmit={editNote} onBlur={(e) => e.target.form.requestSubmit()}>
        owner: {note.owner.name}
        <input name="id" type="hidden" value={note.id} />
        <input
          name="title"
          placeholder="Title"
          defaultValue={note.title}
          disabled={note.owner.id !== user.uid}
        />
        <textarea
          name="text"
          placeholder="Note"
          defaultValue={note.text}
          disabled={note.owner.id !== user.uid}
        />
      </form>
    </div>
  );
}
