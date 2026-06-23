import { motion } from "framer-motion";

function KamKajCard({
  task,
  moveTask,
  deleteTask,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
      bg-gray-50
      dark:bg-slate-700
      text-black
      dark:text-white
      p-4
      rounded-lg
      shadow
      border
      border-gray-200
      dark:border-slate-600
      "
    >
      <h3 className="font-semibold">
        {task.title}
      </h3>

      <div className="flex gap-2 mt-4">
        {task.status ===
          "todo" && (
          <button
            onClick={() =>
              moveTask(
                task.id,
                "progress"
              )
            }
            className="
            bg-blue-500
            hover:bg-blue-600
            text-white
            px-3
            py-1
            rounded
            "
          >
            Start
          </button>
        )}

        {task.status ===
          "progress" && (
          <button
            onClick={() =>
              moveTask(
                task.id,
                "done"
              )
            }
            className="
            bg-green-500
            hover:bg-green-600
            text-white
            px-3
            py-1
            rounded
            "
          >
            Complete
          </button>
        )}

        <button
          onClick={() =>
            deleteTask(task.id)
          }
          className="
          bg-red-500
          hover:bg-red-600
          text-white
          px-3
          py-1
          rounded
          "
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}

export default KamKajCard;