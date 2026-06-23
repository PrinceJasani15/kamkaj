import { pool } from "../config/db.js";

// Get logged-in user's events
export const getEvents = async (req, res) => {
try {
const result = await pool.query(
"SELECT * FROM events WHERE user_id = $1 ORDER BY event_date ASC, event_time ASC",
[req.user.id]
);


res.json(result.rows);


} catch (error) {
console.log("GET EVENTS ERROR:", error.message);


res.status(500).json({
  error: "Failed to get events",
});


}
};

// Create event for logged-in user
export const createEvent = async (req, res) => {
try {
const {
title,
event_date,
event_time,
description,
} = req.body;


if (!title || !title.trim()) {
  return res.status(400).json({
    error: "Event title is required",
  });
}

if (!event_date) {
  return res.status(400).json({
    error: "Event date is required",
  });
}

const result = await pool.query(
  "INSERT INTO events (title, event_date, event_time, description, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
  [
    title.trim(),
    event_date,
    event_time || null,
    description?.trim() || null,
    req.user.id,
  ]
);

res.status(201).json(result.rows[0]);


} catch (error) {
console.log("CREATE EVENT ERROR:", error.message);


res.status(500).json({
  error: "Failed to create event",
});


}
};

// Update logged-in user's event
export const updateEvent = async (req, res) => {
try {
const { id } = req.params;


const {
  title,
  event_date,
  event_time,
  description,
} = req.body;

if (!title || !title.trim()) {
  return res.status(400).json({
    error: "Event title is required",
  });
}

if (!event_date) {
  return res.status(400).json({
    error: "Event date is required",
  });
}

const result = await pool.query(
  "UPDATE events SET title = $1, event_date = $2, event_time = $3, description = $4 WHERE id = $5 AND user_id = $6 RETURNING *",
  [
    title.trim(),
    event_date,
    event_time || null,
    description?.trim() || null,
    id,
    req.user.id,
  ]
);

if (result.rows.length === 0) {
  return res.status(404).json({
    error: "Event not found",
  });
}

res.json(result.rows[0]);


} catch (error) {
console.log("UPDATE EVENT ERROR:", error.message);


res.status(500).json({
  error: "Failed to update event",
});

}
};

// Delete logged-in user's event
export const deleteEvent = async (req, res) => {
try {
const { id } = req.params;

const result = await pool.query(
  "DELETE FROM events WHERE id = $1 AND user_id = $2 RETURNING *",
  [id, req.user.id]
);

if (result.rows.length === 0) {
  return res.status(404).json({
    error: "Event not found",
  });
}

res.json({
  message: "Event deleted",
  event: result.rows[0],
});


} catch (error) {
console.log("DELETE EVENT ERROR:", error.message);

res.status(500).json({
  error: "Failed to delete event",
});

}
};
