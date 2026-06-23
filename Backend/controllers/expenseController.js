import { pool } from "../config/db.js";

// Get logged-in user's expenses
export const getExpenses = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM expenses WHERE user_id = $1 ORDER BY expense_date DESC, id DESC",
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.log("GET EXPENSES ERROR:", error.message);

    res.status(500).json({
      error: "Failed to get expenses",
    });
  }
};

// Create income or expense for logged-in user
export const createExpense = async (req, res) => {
  try {
    const { title, amount, category, expense_date, type } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        error: "Title is required",
      });
    }

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        error: "Valid amount is required",
      });
    }

    if (!expense_date) {
      return res.status(400).json({
        error: "Date is required",
      });
    }

    if (type !== "income" && type !== "expense") {
      return res.status(400).json({
        error: "Type must be income or expense",
      });
    }

    const result = await pool.query(
      `INSERT INTO expenses
       (title, amount, category, expense_date, type, user_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        title.trim(),
        Number(amount),
        category?.trim() || "General",
        expense_date,
        type,
        req.user.id,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log("CREATE EXPENSE ERROR:", error.message);

    res.status(500).json({
      error: "Failed to create transaction",
    });
  }
};

// Update logged-in user's income or expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, expense_date, type } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        error: "Title is required",
      });
    }

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        error: "Valid amount is required",
      });
    }

    if (!expense_date) {
      return res.status(400).json({
        error: "Date is required",
      });
    }

    if (type !== "income" && type !== "expense") {
      return res.status(400).json({
        error: "Type must be income or expense",
      });
    }

    const result = await pool.query(
      `UPDATE expenses
       SET title = $1,
           amount = $2,
           category = $3,
           expense_date = $4,
           type = $5
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [
        title.trim(),
        Number(amount),
        category?.trim() || "General",
        expense_date,
        type,
        id,
        req.user.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Transaction not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log("UPDATE EXPENSE ERROR:", error.message);

    res.status(500).json({
      error: "Failed to update transaction",
    });
  }
};

// Delete logged-in user's income or expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Transaction not found",
      });
    }

    res.json({
      message: "Transaction deleted",
      expense: result.rows[0],
    });
  } catch (error) {
    console.log("DELETE EXPENSE ERROR:", error.message);

    res.status(500).json({
      error: "Failed to delete transaction",
    });
  }
};
