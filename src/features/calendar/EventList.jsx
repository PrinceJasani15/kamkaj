import EventCard from "./EventCard";

function EventList({
  events,
  deleteEvent,
  startEdit,
}) {
  if (events.length === 0) {
    return (
      <div className="app-empty-state p-10">
        No events found. Add your first event.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          deleteEvent={deleteEvent}
          startEdit={startEdit}
        />
      ))}
    </div>
  );
}

export default EventList;
