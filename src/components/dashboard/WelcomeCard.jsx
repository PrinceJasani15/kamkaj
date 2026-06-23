import { motion } from "framer-motion";
import { FaCheckCircle, FaRocket } from "react-icons/fa";

function WelcomeCard({
  userName,
  productivity,
  totalTasks,
  completedTasks,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg"
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-blue-100">
            <FaRocket />
            <span className="text-sm font-medium">
              KamKaj Productivity Space
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-bold">
            Keep building momentum, {userName}!
          </h2>

          <p className="mt-2 max-w-xl text-sm text-blue-100">
            You have completed {completedTasks} out of {totalTasks} tasks.
            Keep your workflow organized and finish your important work today.
          </p>
        </div>

        <div className="min-w-[150px] rounded-2xl bg-white/15 p-5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm text-blue-100">
            <FaCheckCircle />
            Productivity
          </div>

          <p className="mt-2 text-4xl font-bold">
            {productivity}%
          </p>

          <p className="mt-1 text-xs text-blue-100">
            Based on completed tasks
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default WelcomeCard;