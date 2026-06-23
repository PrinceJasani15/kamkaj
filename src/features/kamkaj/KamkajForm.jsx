function KamKajForm({
  title,
  setTitle,
  addTask,
}) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Enter Task..."
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="border p-3 rounded w-full"/>
        <button
        onClick={addTask}
        className="bg-blue-500 text-white px-5 py-2 rounded mt-3">
        Add Task
        </button>
      
    </div>
  );
}

export default KamKajForm;