BEGIN;

-- Add user_id columns without deleting or reassigning existing rows.
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS user_id INTEGER;
ALTER TABLE notes ADD COLUMN IF NOT EXISTS user_id INTEGER;
ALTER TABLE expenses ADD COLUMN IF NOT EXISTS user_id INTEGER;
ALTER TABLE events ADD COLUMN IF NOT EXISTS user_id INTEGER;

CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'tasks_user_id_fkey'
  ) THEN
    ALTER TABLE tasks
      ADD CONSTRAINT tasks_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'notes_user_id_fkey'
  ) THEN
    ALTER TABLE notes
      ADD CONSTRAINT notes_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'expenses_user_id_fkey'
  ) THEN
    ALTER TABLE expenses
      ADD CONSTRAINT expenses_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'events_user_id_fkey'
  ) THEN
    ALTER TABLE events
      ADD CONSTRAINT events_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Optional workflow/projects tables if they exist in your database.
DO $$
BEGIN
  IF to_regclass('public.projects') IS NOT NULL THEN
    ALTER TABLE projects ADD COLUMN IF NOT EXISTS user_id INTEGER;
    CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);

    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint WHERE conname = 'projects_user_id_fkey'
    ) THEN
      ALTER TABLE projects
        ADD CONSTRAINT projects_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;

  IF to_regclass('public.workflow') IS NOT NULL THEN
    ALTER TABLE workflow ADD COLUMN IF NOT EXISTS user_id INTEGER;
    CREATE INDEX IF NOT EXISTS idx_workflow_user_id ON workflow(user_id);

    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint WHERE conname = 'workflow_user_id_fkey'
    ) THEN
      ALTER TABLE workflow
        ADD CONSTRAINT workflow_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;

  IF to_regclass('public.ai_chat_history') IS NOT NULL THEN
    ALTER TABLE ai_chat_history ADD COLUMN IF NOT EXISTS user_id INTEGER;
    CREATE INDEX IF NOT EXISTS idx_ai_chat_history_user_id
      ON ai_chat_history(user_id);

    IF NOT EXISTS (
      SELECT 1
      FROM pg_constraint
      WHERE conname = 'ai_chat_history_user_id_fkey'
    ) THEN
      ALTER TABLE ai_chat_history
        ADD CONSTRAINT ai_chat_history_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
  END IF;
END $$;

COMMIT;

-- Existing old rows are intentionally left with user_id = NULL.
-- Review and assign them manually, for example:
-- UPDATE tasks SET user_id = <correct_user_id> WHERE user_id IS NULL AND id IN (...);
-- UPDATE notes SET user_id = <correct_user_id> WHERE user_id IS NULL AND id IN (...);
-- UPDATE expenses SET user_id = <correct_user_id> WHERE user_id IS NULL AND id IN (...);
-- UPDATE events SET user_id = <correct_user_id> WHERE user_id IS NULL AND id IN (...);
--
-- After every old row is assigned, you may enforce required ownership:
-- ALTER TABLE tasks ALTER COLUMN user_id SET NOT NULL;
-- ALTER TABLE notes ALTER COLUMN user_id SET NOT NULL;
-- ALTER TABLE expenses ALTER COLUMN user_id SET NOT NULL;
-- ALTER TABLE events ALTER COLUMN user_id SET NOT NULL;
