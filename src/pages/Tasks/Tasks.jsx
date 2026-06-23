import { useState, useEffect } from "react";
import api from "../../services/api";

import TaskForm from "../../features/tasks/TaskForm";
import TaskList from "../../features/tasks/TaskList";
import TaskStats from "../../components/tasks/TaskStats";

function Tasks() {
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await api.get("/tasks");

      setTasks(response.data);
    } catch (error) {
      console.log(
        "GET TASKS ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.error ||
          "Tasks load nathi thai."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!task.trim()) {
      return;
    }

    try {
      const response = await api.post(
        "/tasks",
        {
          title: task.trim(),
        }
      );

      setTasks((oldTasks) => [
        response.data,
        ...oldTasks,
      ]);

      setTask("");
    } catch (error) {
      console.log(
        "ADD TASK ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.error ||
          "Task add nathi thai."
      );
    }
  };

  const deleteTask = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await api.delete("/tasks/" + id);

      setTasks((oldTasks) =>
        oldTasks.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.log(
        "DELETE TASK ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.error ||
          "Task delete nathi thai."
      );
    }
  };

  const toggleTask = async (id) => {
    try {
      const response = await api.patch(
        "/tasks/" + id + "/toggle"
      );

      setTasks((oldTasks) =>
        oldTasks.map((item) =>
          item.id === id ? response.data : item
        )
      );
    } catch (error) {
      console.log(
        "TOGGLE TASK ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.error ||
          "Task update nathi thai."
      );
    }
  };

  const updateTask = async (id, title) => {
    if (!title.trim()) {
      alert("Task title required chhe.");
      return false;
    }

    try {
      const response = await api.put(
        "/tasks/" + id,
        {
          title: title.trim(),
        }
      );

      setTasks((oldTasks) =>
        oldTasks.map((item) =>
          item.id === id ? response.data : item
        )
      );

      return true;
    } catch (error) {
      console.log(
        "UPDATE TASK ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.error ||
          "Task update nathi thai."
      );

      return false;
    }
  };

  const filteredTasks = tasks.filter((item) =>
    item.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="p-6 text-slate-900 dark:text-white">
      <h1 className="mb-6 text-3xl font-bold">
        Task Manager
      </h1>

      <TaskForm
        task={task}
        setTask={setTask}
        addTask={addTask}
      />

      <TaskStats
        total={totalTasks}
        completed={completedTasks}
        pending={pendingTasks}
      />

      <input
        type="text"
        placeholder="Search Tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="app-input mb-6"
      />

      {loading ? (
        <p className="text-slate-400">
          Loading tasks...
        </p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          updateTask={updateTask}
        />
      )}
    </div>
  );
}

export default Tasks;
