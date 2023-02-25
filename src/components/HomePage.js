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
      <nav className="navbar navbar-dark bg-dark px-2 px-md-5">
        <div className="container-fluid justify-content-center justify-content-md-between">
          <a href="/" className="navbar-brand display-1">
            <img
              src={process.env.PUBLIC_URL + "/logo192.png"}
              alt="logo"
              width={32}
              height={32}
              className="rounded-3 mx-2"
            />
            Pluma Notes
          </a>
          <div>
            <button className="btn btn-sm btn-dark m-1" onClick={addNote}>
              Add Note
            </button>
            <button className="btn btn-sm btn-dark m-1" onClick={getAllNotes}>
              See All Notes
            </button>
            <button className="btn btn-sm btn-dark m-1" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="container">
        <Notes
          user={user}
          notes={notes}
          deleteNote={deleteNote}
          editNote={editNote}
        />
      </div>
    </div>
  );
}

function Notes({ user, notes, deleteNote, editNote }) {
  return (
    <div className="container row">
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
    <div className="card col-12 col-md-4 mx-0 mx-md-3 my-2 border-0 bg-light">
      <div className="card-body">
        <form onSubmit={editNote} onBlur={(e) => e.target.form.requestSubmit()}>
          <label htmlFor="id" className="form-label fw-semibold text-black-50">
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
            className="form-control mt-4 mb-2 border-0 fw-semibold"
            name="title"
            placeholder="Title"
            defaultValue={note.title}
            disabled={note.owner.id !== user.uid}
          />
          <textarea
            className="form-control border-0"
            name="text"
            placeholder="Note"
            defaultValue={note.text}
            disabled={note.owner.id !== user.uid}
            rows="10"
          />
        </form>
      </div>
    </div>
  );
}
