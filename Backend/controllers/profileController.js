import { pool } from "../config/db.js";

export const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        id,
        name,
        email,
        job_title,
        bio,
        avatar_url,
        email_notifications,
        task_reminders,
        created_at
      FROM users
      WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log("GET PROFILE ERROR:", error.message);

    res.status(500).json({
      error: "Failed to get profile",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      job_title,
      bio,
      avatar_url,
      email_notifications,
      task_reminders,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        error: "Name is required",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        error: "Email is required",
      });
    }

    const result = await pool.query(
      `UPDATE users
      SET
        name = $1,
        email = $2,
        job_title = $3,
        bio = $4,
        avatar_url = $5,
        email_notifications = $6,
        task_reminders = $7
      WHERE id = $8
      RETURNING
        id,
        name,
        email,
        job_title,
        bio,
        avatar_url,
        email_notifications,
        task_reminders,
        created_at`,
      [
        name.trim(),
        email.trim(),
        job_title?.trim() || null,
        bio?.trim() || null,
        avatar_url?.trim() || null,
        Boolean(email_notifications),
        Boolean(task_reminders),
        req.user.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log("UPDATE PROFILE ERROR:", error.message);

    if (error.code === "23505") {
      return res.status(400).json({
        error: "This email is already in use",
      });
    }

    res.status(500).json({
      error: "Failed to update profile",
    });
  }
};
