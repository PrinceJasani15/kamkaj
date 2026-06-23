import { pool } from "../config/db.js";

// Get logged-in user's notes
export const getNotes = async (req, res) => {
try {
const result = await pool.query(
"SELECT * FROM notes WHERE user_id = $1 ORDER BY id DESC",
[req.user.id]
);


res.json(result.rows);


} catch (error) {
console.log("GET NOTES ERROR:", error.message);


res.status(500).json({
  error: "Failed to get notes",
});


}
};

// Create note for logged-in user
export const createNote = async (req, res) => {
try {
const { title, content, category } = req.body;


if (!title || !title.trim()) {
  return res.status(400).json({
    error: "Note title is required",
  });
}

if (!content || !content.trim()) {
  return res.status(400).json({
    error: "Note content is required",
  });
}

const result = await pool.query(
  "INSERT INTO notes (title, content, category, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
  [
    title.trim(),
    content.trim(),
    category?.trim() || "General",
    req.user.id,
  ]
);

res.status(201).json(result.rows[0]);


} catch (error) {
console.log("CREATE NOTE ERROR:", error.message);


res.status(500).json({
  error: "Failed to create note",
});


}
};

// Update logged-in user's note
export const updateNote = async (req, res) => {
try {
const { id } = req.params;
const { title, content, category } = req.body;


if (!title || !title.trim()) {
  return res.status(400).json({
    error: "Note title is required",
  });
}

if (!content || !content.trim()) {
  return res.status(400).json({
    error: "Note content is required",
  });
}

const result = await pool.query(
  "UPDATE notes SET title = $1, content = $2, category = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
  [
    title.trim(),
    content.trim(),
    category?.trim() || "General",
    id,
    req.user.id,
  ]
);

if (result.rows.length === 0) {
  return res.status(404).json({
    error: "Note not found",
  });
}

res.json(result.rows[0]);


} catch (error) {
console.log("UPDATE NOTE ERROR:", error.message);


res.status(500).json({
  error: "Failed to update note",
});


}
};

// Delete logged-in user's note
export const deleteNote = async (req, res) => {
try {
const { id } = req.params;


const result = await pool.query(
  "DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *",
  [id, req.user.id]
);

if (result.rows.length === 0) {
  return res.status(404).json({
    error: "Note not found",
  });
}

res.json({
  message: "Note deleted",
  note: result.rows[0],
});


} catch (error) {
console.log("DELETE NOTE ERROR:", error.message);


res.status(500).json({
  error: "Failed to delete note",
});


}
};
