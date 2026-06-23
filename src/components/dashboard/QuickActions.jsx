import { Link } from "react-router-dom";

function QuickActions() {
  return (
    <div className="bg-white  dark:bg-slate-800
 dark:text-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/tasks"
          className="bg-blue-500 text-white p-3 rounded-lg text-center"
        >
          Add Task
        </Link>

        <button className="bg-green-500 text-white p-3 rounded-lg">
          Add Note
        </button>

        <button className="bg-purple-500 text-white p-3 rounded-lg">
          Add Event
        </button>

        <button className="bg-orange-500 text-white p-3 rounded-lg">
          Add Expense
        </button>
      </div>
    </div>
  );
}

export default QuickActions;