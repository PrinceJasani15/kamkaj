import { useEffect, useState } from "react";
import api from "../../services/api";

function RecentTasks() {
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await api.get("/tasks");

        setRecentTasks(response.data.slice(0, 5));
      } catch (error) {
        console.log(
          "RECENT TASKS LOAD ERROR:",
          error.response?.data || error.message
        );
      }
    };

    loadTasks();
  }, []);

  return (
    <div className="bg-white  dark:bg-slate-800
 dark:text-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Recent Tasks
      </h2>

      {recentTasks.length === 0 ? (
        <p className="text-gray-500">
          No tasks found
        </p>
      ) : (
        <div className="space-y-3">
          {recentTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between border-b pb-2"
            >
              <span>{task.title}</span>

              <span>
                {task.completed ? "✅" : "⏳"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentTasks;
