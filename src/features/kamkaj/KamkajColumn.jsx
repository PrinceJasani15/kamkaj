import KamKajCard from "./KamKajCard";

function KamKajColumn({
  title,
  tasks,
  moveTask,
  deleteTask,
}) {
  return (
    <div
      className="
      bg-white
      dark:bg-slate-800
      text-black
      dark:text-white
      p-4
      rounded-xl
      shadow-lg
      min-h-[350px]
      "
    >
      <h2 className="text-xl font-bold mb-4">
        {title}
      </h2>

      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <KamKajCard
            key={task.id}
            task={task}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default KamKajColumn;