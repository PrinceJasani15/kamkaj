import { useState } from "react";

function TaskCard({
  item,
  deleteTask,
  toggleTask,
  updateTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    const isUpdated = await updateTask(
      item.id,
      editedTitle
    );

    setSaving(false);

    if (isUpdated) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(item.title);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }

              if (e.key === "Escape") {
                handleCancel();
              }
            }}
            autoFocus
            className="app-input border-blue-500"
          />
        ) : (
          <h3
            className={
              item.completed
                ? "break-words text-slate-400 line-through dark:text-slate-500"
                : "break-words text-slate-900 dark:text-white"
            }
          >
            {item.title}
          </h3>
        )}
      </div>

      <div className="flex flex-wrap gap-2 sm:justify-end">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={handleCancel}
              disabled={saving}
              className="rounded bg-slate-600 px-3 py-1 text-white transition hover:bg-slate-500 disabled:opacity-60"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => toggleTask(item.id)}
              className={
                item.completed
                  ? "rounded bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-600"
                  : "rounded bg-green-500 px-3 py-1 text-white transition hover:bg-green-600"
              }
            >
              {item.completed ? "Undo" : "Done"}
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="rounded bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-600"
            >
              Edit
            </button>

            <button
              onClick={() => deleteTask(item.id)}
              className="rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
