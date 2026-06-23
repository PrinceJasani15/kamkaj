import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  deleteTask,
  toggleTask,
  updateTask,
}) {
  if (tasks.length === 0) {
    return (
      <p className="app-empty-state">
        No tasks found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((item) => (
        <TaskCard
          key={item.id}
          item={item}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          updateTask={updateTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
