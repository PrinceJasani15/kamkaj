function EventForm({
  title,
  setTitle,
  date,
  setDate,
  time,
  setTime,
  description,
  setDescription,
  addEvent,
  editingEvent,
  cancelEdit,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="app-card mb-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {editingEvent
            ? "Edit Event"
            : "Add New Event"}
        </h2>

        {editingEvent ? (
          <button
            type="button"
            onClick={cancelEdit}
            className="rounded bg-slate-700 px-3 py-2 text-sm text-white transition hover:bg-slate-600"
          >
            Cancel
          </button>
        ) : null}
      </div>

      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Event title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="app-input"
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="app-input"
          required
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="app-input"
        />

        <textarea
          placeholder="Event description (optional)..."
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="app-input min-h-28 resize-y"
        />

        <button
          type="submit"
          className="rounded bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          {editingEvent
            ? "Update Event"
            : "Add Event"}
        </button>
      </div>
    </form>
  );
}

export default EventForm;
