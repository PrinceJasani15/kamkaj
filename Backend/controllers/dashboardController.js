import { pool } from "../config/db.js";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    const [
      tasksResult,
      notesResult,
      expensesResult,
      eventsResult,
    ] = await Promise.all([
      pool.query(
        "SELECT * FROM tasks WHERE user_id = $1",
        [userId]
      ),
      pool.query(
        "SELECT * FROM notes WHERE user_id = $1",
        [userId]
      ),
      pool.query(
        "SELECT * FROM expenses WHERE user_id = $1",
        [userId]
      ),
      pool.query(
        `SELECT * FROM events
         WHERE user_id = $1 AND event_date >= CURRENT_DATE
         ORDER BY event_date ASC, event_time ASC
         LIMIT 5`,
        [userId]
      ),
    ]);

    const tasks = tasksResult.rows;
    const notes = notesResult.rows;
    const expenses = expensesResult.rows;
    const upcomingEvents = eventsResult.rows;

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.completed
    ).length;

    const pendingTasks = totalTasks - completedTasks;

    const income = expenses
      .filter((item) => item.type === "income")
      .reduce(
        (total, item) => total + Number(item.amount),
        0
      );

    const totalExpenses = expenses
      .filter((item) => item.type === "expense")
      .reduce(
        (total, item) => total + Number(item.amount),
        0
      );

    const balance = income - totalExpenses;

    const productivity =
      totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

    res.json({
      stats: {
        totalTasks,
        completedTasks,
        pendingTasks,
        notesCount: notes.length,
        income,
        totalExpenses,
        balance,
        productivity,
      },
      upcomingEvents,
    });
  } catch (error) {
    console.log(
      "GET DASHBOARD DATA ERROR:",
      error.message
    );

    res.status(500).json({
      error: "Failed to load dashboard data",
    });
  }
};
