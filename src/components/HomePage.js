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
    <div>
      <div>
        <button className="btn btn-sm btn-secondary m-1" onClick={logoutUser}>Logout {user.displayName}</button>
        <button className="btn btn-sm btn-secondary m-1" onClick={getAllNotes}>
          See all user notes (For test purposes only)
        </button>
      </div>
      <button className="btn btn-sm btn-secondary m-1" onClick={addNote}>Add Note</button>
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
    <div class="row">
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
    <div className="card col-12">
      <div class="card-body">
        <form onSubmit={editNote} onBlur={(e) => e.target.form.requestSubmit()}>
          <label for="id" class="form-label">
            {note.owner.name}
          </label>
          <button
            type="button"
            className="btn-close float-end"
            aria-label="Close"
            onClick={deleteNote}
            value={note.id}
            hidden={user.uid !== note.owner.id}
          ></button>
          <input name="id" type="hidden" value={note.id} />
          <input
            className="form-control"
            name="title"
            placeholder="Title"
            defaultValue={note.title}
            disabled={note.owner.id !== user.uid}
          />
          <textarea
            className="form-control"
            name="text"
            placeholder="Note"
            defaultValue={note.text}
            disabled={note.owner.id !== user.uid}
          />
        </form>
      </div>
    </div>
  );
}
