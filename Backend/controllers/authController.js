import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, company } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email.trim()]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        error: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
        INSERT INTO users (name, email, password, phone, company)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, email, phone, company, created_at
      `,
      [
        name.trim(),
        email.trim().toLowerCase(),
        hashedPassword,
        phone?.trim() || null,
        company?.trim() || null,
      ]
    );

    return res.status(201).json({
      message: "User Registered",
      user: result.rows[0],
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error.message);

    return res.status(500).json({
      error: "Registration Failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const result = await pool.query(
      `
        SELECT id, name, email, password, phone, company, created_at
        FROM users
        WHERE email = $1
      `,
      [email.trim().toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User Not Found",
      });
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({
        error: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error.message);

    return res.status(500).json({
      error: "Login Failed",
    });
  }
};