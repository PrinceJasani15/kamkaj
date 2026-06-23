import { pool } from "../config/db.js";

// Logged-in user profile get
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT id, name, email, phone, company, created_at
      FROM users
      WHERE id = $1
      `,
      [userId]
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

// Logged-in user profile update
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, phone, company } = req.body;

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({
        error: "Name and email are required",
      });
    }

    const result = await pool.query(
      `
      UPDATE users
      SET
        name = $1,
        email = $2,
        phone = $3,
        company = $4
      WHERE id = $5
      RETURNING id, name, email, phone, company, created_at
      `,
      [
        name.trim(),
        email.trim(),
        phone?.trim() || null,
        company?.trim() || null,
        userId,
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

    res.status(500).json({
      error: "Failed to update profile",
    });
  }
};