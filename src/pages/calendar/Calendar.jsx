import { useState, useEffect } from "react";
import api from "../../services/api";

import EventForm from "../../features/calendar/EventForm";
import EventList from "../../features/calendar/EventList";

function Calendar() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const response = await api.get("/events");

      setEvents(response.data);
    } catch (error) {
      console.log(
        "GET EVENTS ERROR:",
        error.response?.data || error.message
      );

      alert("Events load nathi thai.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDate("");
    setTime("");
    setDescription("");
    setEditingEvent(null);
  };

  const addEvent = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!title.trim() || !date) {
      alert("Event title ane date lakho.");
      return;
    }

    const eventData = {
      title: title.trim(),
      event_date: date,
      event_time: time || null,
      description: description.trim() || null,
    };

    try {
      if (editingEvent) {
        const response = await api.put(
          "/events/" + editingEvent.id,
          eventData
        );

        setEvents((oldEvents) =>
          oldEvents.map((event) =>
            event.id === editingEvent.id
              ? response.data
              : event
          )
        );
      } else {
        const response = await api.post(
          "/events",
          eventData
        );

        setEvents((oldEvents) => [
          ...oldEvents,
          response.data,
        ]);
      }

      resetForm();
    } catch (error) {
      console.log(
        "SAVE EVENT ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.error ||
          "Event save nathi thai."
      );
    }
  };

  const deleteEvent = async (id) => {
    try {
      await api.delete("/events/" + id);

      setEvents((oldEvents) =>
        oldEvents.filter((event) => event.id !== id)
      );

      if (editingEvent?.id === id) {
        resetForm();
      }
    } catch (error) {
      console.log(
        "DELETE EVENT ERROR:",
        error.response?.data || error.message
      );

      alert("Event delete nathi thai.");
    }
  };

  const startEdit = (event) => {
    setEditingEvent(event);

    setTitle(event.title || "");

    setDate(
      event.event_date
        ? event.event_date.split("T")[0]
        : ""
    );

    setTime(
      event.event_time
        ? event.event_time.slice(0, 5)
        : ""
    );

    setDescription(event.description || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const upcomingEvents = [...events]
    .filter((event) => {
      const eventDate = new Date(event.event_date);
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      return eventDate >= today;
    })
    .slice(0, 5);

  return (
    <div className="p-6 text-slate-900 dark:text-white">
      <h1 className="mb-6 text-3xl font-bold">
        Calendar
      </h1>

      <EventForm
        title={title}
        setTitle={setTitle}
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        description={description}
        setDescription={setDescription}
        addEvent={addEvent}
        editingEvent={editingEvent}
        cancelEdit={resetForm}
      />

      <div className="app-card mb-6">
        <h2 className="mb-4 text-xl font-bold">
          Upcoming Events
        </h2>

        {upcomingEvents.length === 0 ? (
          <p className="text-slate-400">
            No upcoming events.
          </p>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-col gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold">
                    {event.title}
                  </p>

                  <p className="app-muted-text text-sm">
                    {new Date(
                      event.event_date
                    ).toLocaleDateString()}
                    {event.event_time
                      ? " • " +
                        event.event_time.slice(0, 5)
                      : ""}
                  </p>
                </div>

                <span className="self-start rounded bg-blue-600 px-3 py-1 text-xs text-white sm:self-center">
                  Upcoming
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <p className="text-slate-400">
          Loading events...
        </p>
      ) : (
        <EventList
          events={events}
          deleteEvent={deleteEvent}
          startEdit={startEdit}
        />
      )}
    </div>
  );
}

export default Calendar;
