import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function ExpenseChart({ income, expense }) {
  const safeIncome = Number(income) || 0;
  const safeExpense = Number(expense) || 0;

  const data = [
    {
      name: "Income",
      amount: safeIncome,
    },
    {
      name: "Expense",
      amount: safeExpense,
    },
  ];

  const hasData = safeIncome > 0 || safeExpense > 0;

  return (
    <div className="rounded-xl bg-white p-5 shadow-md dark:bg-slate-800 dark:text-white">
      <h2 className="mb-4 text-xl font-bold">
        Financial Overview
      </h2>

      {hasData ? (
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  "₹" + Number(value).toLocaleString("en-IN")
                }
              />

              <Bar
                dataKey="amount"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-[280px] items-center justify-center text-slate-400">
          No financial data available.
        </div>
      )}
    </div>
  );
}

export default ExpenseChart;