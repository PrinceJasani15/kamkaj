function TaskStats({ total, completed, pending }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-500 text-white p-5 rounded-xl shadow-md">
        <h3 className="text-sm">Total Tasks</h3>
        <p className="text-3xl font-bold mt-2">
          {total}
        </p>
      </div>

      <div className="bg-green-500 text-white p-5 rounded-xl shadow-md">
        <h3 className="text-sm">Completed</h3>
        <p className="text-3xl font-bold mt-2">
          {completed}
        </p>
      </div>

      <div className="bg-orange-500 text-white p-5 rounded-xl shadow-md">
        <h3 className="text-sm">Pending</h3>
        <p className="text-3xl font-bold mt-2">
          {pending}
        </p>
      </div>
    </div>
  );
}

export default TaskStats;