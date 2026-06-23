function NoteList({
  notes,
  deleteNote,
  startEditNote,
}) {
  if (notes.length === 0) {
    return (
      <div className="app-empty-state p-10">
        No notes found. Add your first note.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <div
          key={note.id}
          className="flex min-h-52 flex-col rounded-xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
              {note.category || "General"}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => startEditNote(note)}
                className="rounded bg-amber-500 px-3 py-1 text-sm text-white transition hover:bg-amber-600"
              >
                Edit
              </button>

              <button
                onClick={() => deleteNote(note.id)}
                className="rounded bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>

          <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
            {note.title}
          </h3>

          <p className="flex-1 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">
            {note.content}
          </p>

          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            {note.created_at
              ? new Date(note.created_at).toLocaleDateString()
              : ""}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NoteList;  
