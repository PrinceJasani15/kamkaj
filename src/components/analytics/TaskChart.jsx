import {
PieChart,
Pie,
Cell,
Tooltip,
Legend,
ResponsiveContainer,
} from "recharts";

function TaskChart({ completed, pending }) {
const data = [
{
name: "Completed",
value: completed,
},
{
name: "Pending",
value: pending,
},
];

const COLORS = ["#22c55e", "#ef4444"];

const hasData = completed > 0 || pending > 0;

return ( <div className="rounded-xl bg-white p-5 shadow-md dark:bg-slate-800 dark:text-white"> <h2 className="mb-4 text-xl font-bold">
Task Status </h2>


  {hasData ? (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={85}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  ) : (
    <div className="flex h-[280px] items-center justify-center text-slate-400">
      No task data available.
    </div>
  )}
</div>


);
}

export default TaskChart;
