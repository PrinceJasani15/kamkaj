function EventCard({
  event,
  deleteEvent,
  startEdit,
}) {
  const formattedDate = event.event_date
    ? new Date(event.event_date).toLocaleDateString()
    : "";

  const formattedTime = event.event_time
    ? event.event_time.slice(0, 5)
    : "";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {event.title}
          </h3>

          <p className="app-muted-text mt-2 text-sm">
            📅 {formattedDate}
            {formattedTime
              ? " • " + formattedTime
              : ""}
          </p>

          {event.description ? (
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">
              {event.description}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <button
            onClick={() => startEdit(event)}
            className="rounded bg-yellow-500 px-3 py-2 text-sm text-white transition hover:bg-yellow-600"
          >
            Edit
          </button>

          <button
            onClick={() => deleteEvent(event.id)}
            className="rounded bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
