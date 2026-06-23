import Groq from "groq-sdk";
import { pool } from "../config/db.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const getSummary = async (userId) => {
  const [
    tasksResult,
    notesResult,
    eventsResult,
    expensesResult,
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
      "SELECT * FROM events WHERE user_id = $1",
      [userId]
    ),
    pool.query(
      "SELECT * FROM expenses WHERE user_id = $1",
      [userId]
    ),
  ]);

  const tasks = tasksResult.rows;
  const notes = notesResult.rows;
  const events = eventsResult.rows;
  const expenses = expensesResult.rows;

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const productivity =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  const income = expenses
    .filter((item) => item.type === "income")
    .reduce(
      (total, item) => total + Number(item.amount),
      0
    );

  const expense = expenses
    .filter((item) => item.type === "expense")
    .reduce(
      (total, item) => total + Number(item.amount),
      0
    );

  const balance = income - expense;

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const upcomingEvents = events
    .filter((event) => {
      const eventDate = event.event_date || event.date;
      return eventDate >= today;
    })
    .sort((a, b) => {
      const firstDate = a.event_date || a.date;
      const secondDate = b.event_date || b.date;

      return firstDate.localeCompare(secondDate);
    })
    .slice(0, 3);

  const eventText =
    upcomingEvents.length > 0
      ? upcomingEvents
          .map((event) => {
            const eventDate =
              event.event_date || event.date;

            return `- ${event.title} (${eventDate})`;
          })
          .join("\n")
      : "No upcoming events.";

  return (
    "📊 Your KamKaj Productivity Summary\n\n" +
    `Tasks: ${totalTasks}\n` +
    `Completed: ${completedTasks}\n` +
    `Pending: ${pendingTasks}\n` +
    `Productivity: ${productivity}%\n\n` +
    `Notes: ${notes.length}\n\n` +
    `Income: ₹${income.toLocaleString("en-IN")}\n` +
    `Expenses: ₹${expense.toLocaleString("en-IN")}\n` +
    `Balance: ₹${balance.toLocaleString("en-IN")}\n\n` +
    "Upcoming Events:\n" +
    eventText
  );
};

const createTaskFromAI = async (title, userId) => {
  const result = await pool.query(
    "INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *",
    [title.trim(), userId]
  );

  return result.rows[0];
};

const createNoteFromAI = async (title, content, userId) => {
  const result = await pool.query(
    `INSERT INTO notes (title, content, category, user_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title.trim(), content.trim(), "AI Note", userId]
  );

  return result.rows[0];
};

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const cleanMessage = message.trim();
    const lowerMessage = cleanMessage.toLowerCase();
    const userId = req.user.id;

    if (
      lowerMessage.includes("my summary") ||
      lowerMessage.includes("productivity summary") ||
      lowerMessage === "summary"
    ) {
      const reply = await getSummary(userId);

      return res.json({
        reply,
        action: "summary",
      });
    }

    if (
      lowerMessage.startsWith("create task") ||
      lowerMessage.startsWith("add task")
    ) {
      const taskTitle = cleanMessage
        .replace(/^(create|add)\s+task\s*:?\s*/i, "")
        .trim();

      if (!taskTitle) {
        return res.json({
          reply:
            "Please task title lakho. Example: Create task Finish dashboard",
        });
      }

      const newTask = await createTaskFromAI(taskTitle, userId);

      return res.json({
        reply: `✅ Task created successfully: ${newTask.title}`,
        action: "task_created",
        data: newTask,
      });
    }

    if (
      lowerMessage.startsWith("create note") ||
      lowerMessage.startsWith("add note")
    ) {
      const noteText = cleanMessage
        .replace(/^(create|add)\s+note\s*:?\s*/i, "")
        .trim();

      if (!noteText) {
        return res.json({
          reply:
            "Please note lakho. Example: Create note React Hooks: Practice useEffect",
        });
      }

      const parts = noteText.split(":");

      const noteTitle = parts[0].trim() || "AI Note";
      const noteContent =
        parts.slice(1).join(":").trim() || noteText;

      const newNote = await createNoteFromAI(
        noteTitle,
        noteContent,
        userId
      );

      return res.json({
        reply: `📝 Note created successfully: ${newNote.title}`,
        action: "note_created",
        data: newNote,
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        error:
          "GROQ_API_KEY is missing. Add it in your backend .env file.",
      });
    }

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are KamKaj AI, a helpful productivity assistant. Answer clearly, briefly, and in the same language as the user.",
          },
          {
            role: "user",
            content: cleanMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 700,
      });

    const reply =
      completion.choices[0]?.message?.content ||
      "Sorry, I could not generate an answer.";

    return res.json({
      reply,
      action: "chat",
    });
  } catch (error) {
    console.log(
      "GROQ AI CHAT ERROR:",
      error.message || error
    );

    return res.status(500).json({
      error:
        error.message ||
        "AI response failed",
    });
  }
};
