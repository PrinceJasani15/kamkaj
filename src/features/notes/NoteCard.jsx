function NoteCard({
  note,
  deleteNote,
  togglePin,
}) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-lg">
        {note.pinned ? "📌 " : ""}
        {note.title}
      </h3>

      <div className="mt-3 flex gap-3">
        <button
          onClick={() =>
            togglePin(note.id)
          }
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          {note.pinned
            ? "Unpin"
            : "Pin"}
        </button>

        <button
          onClick={() =>
            deleteNote(note.id)
          }
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;