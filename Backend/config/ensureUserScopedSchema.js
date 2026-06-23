import { pool } from "./db.js";

export const ensureUserScopedSchema = async () => {
  const statements = [
    "ALTER TABLE tasks ADD COLUMN IF NOT EXISTS user_id INTEGER",
    "ALTER TABLE notes ADD COLUMN IF NOT EXISTS user_id INTEGER",
    "ALTER TABLE expenses ADD COLUMN IF NOT EXISTS user_id INTEGER",
    "ALTER TABLE events ADD COLUMN IF NOT EXISTS user_id INTEGER",
    "CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id)",
    "CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id)",
    "CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id)",
    "CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id)",
  ];

  for (const statement of statements) {
    await pool.query(statement);
  }

  console.log("User scoped schema ready");
};
