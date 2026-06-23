function TaskForm({ task, setTask, addTask }) {
  return (
    <form onSubmit={addTask} className="app-action-row mb-6">
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="app-input"
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 sm:w-auto"
      >
        Add
      </button>
    </form>
  );
}

export default TaskForm;
