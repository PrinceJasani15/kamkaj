import { motion } from "framer-motion";

function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      className="
      bg-white
      dark:bg-slate-800
      dark:text-white
      p-5
      rounded-xl
      shadow
      "
    >
      <h3>{title}</h3>

      <p className="text-3xl font-bold">
        {value}
      </p>
    </motion.div>
  );
}

export default StatCard;