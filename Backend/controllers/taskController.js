import { pool } from "../config/db.js";

// Get logged-in user's tasks
export const getTasks = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM tasks
      WHERE user_id = $1
      ORDER BY id DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.log("GET TASKS ERROR:", error.message);

    res.status(500).json({
      error: "Failed to get tasks",
    });
  }
};

// Create task for logged-in user
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        error: "Task title is required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO tasks (title, user_id)
      VALUES ($1, $2)
      RETURNING *
      `,
      [title.trim(), req.user.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log("CREATE TASK ERROR:", error.message);

    res.status(500).json({
      error: "Failed to create task",
    });
  }
};

// Toggle only logged-in user's task
export const toggleTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE tasks
      SET completed = NOT completed
      WHERE id = $1 AND user_id = $2
      RETURNING *
      `,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log("TOGGLE TASK ERROR:", error.message);

    res.status(500).json({
      error: "Failed to update task",
    });
  }
};

// Update only logged-in user's task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        error: "Task title is required",
      });
    }

    const result = await pool.query(
      `
      UPDATE tasks
      SET title = $1
      WHERE id = $2 AND user_id = $3
      RETURNING *
      `,
      [title.trim(), id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log("UPDATE TASK ERROR:", error.message);

    res.status(500).json({
      error: "Failed to update task",
    });
  }
};

// Delete only logged-in user's task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM tasks
      WHERE id = $1 AND user_id = $2
      RETURNING *
      `,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.json({
      message: "Task deleted",
      task: result.rows[0],
    });
  } catch (error) {
    console.log("DELETE TASK ERROR:", error.message);

    res.status(500).json({
      error: "Failed to delete task",
    });
  }
};