import { useState, useEffect } from "react";
import PageWrapper from "../../components/common/PageWrapper";
import KamKajForm from "../../features/kamkaj/KamKajForm";
import KamKajColumn from "../../features/kamkaj/KamKajColumn";
import { useAuth } from "../../context/AuthContext";

function KamKaj() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const workflowStorageKey = user?.id
    ? `kamkaj_workflow_${user.id}`
    : null;

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!workflowStorageKey) {
      setTasks([]);
      return;
    }

    const saved = localStorage.getItem(workflowStorageKey);

    setTasks(saved ? JSON.parse(saved) : []);
  }, [workflowStorageKey]);

  const addTask = () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      status: "todo",
    };

    setTasks([
      ...tasks,
      newTask,
    ]);

    setTitle("");
  };

  const moveTask = (
    id,
    status
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(
      tasks.filter(
        (task) =>
          task.id !== id
      )
    );
  };

  useEffect(() => {
    if (workflowStorageKey) {
      localStorage.setItem(
        workflowStorageKey,
        JSON.stringify(tasks)
      );
    }
  }, [workflowStorageKey, tasks]);

  const todoTasks =
    tasks.filter(
      (task) =>
        task.status === "todo"
    );

  const progressTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "progress"
    );

  const doneTasks =
    tasks.filter(
      (task) =>
        task.status === "done"
    );

  return (
    <PageWrapper>
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-6 text-black dark:text-white">
          KamKaj Workflow
        </h1>

        
        <KamKajForm 
          title={title}
          setTitle={setTitle}
          addTask={addTask}
        />

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <KamKajColumn
            title="To Do"
            tasks={todoTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />

          <KamKajColumn
            title="In Progress"
            tasks={progressTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />

          <KamKajColumn
            title="Done"
            tasks={doneTasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
        </div>
      </div>
    </PageWrapper>
  );
}

export default KamKaj;
