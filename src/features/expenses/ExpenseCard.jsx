function ExpenseCard({ item, deleteExpense }) {
const isIncome = item.type === "income";

const formattedDate = item.expense_date
? new Date(item.expense_date).toLocaleDateString()
: "";

const formattedAmount = Number(item.amount).toLocaleString(
"en-IN",
{
minimumFractionDigits: 2,
maximumFractionDigits: 2,
}
);

return ( <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white sm:flex-row sm:items-center sm:justify-between"> <div> <div className="flex flex-wrap items-center gap-3"> <h3 className="font-semibold">
{item.title} </h3>


      <span
        className={
          isIncome
            ? "rounded-full bg-emerald-500/15 px-2 py-1 text-xs text-emerald-700 dark:text-emerald-300"
            : "rounded-full bg-red-500/15 px-2 py-1 text-xs text-red-700 dark:text-red-300"
        }
      >
        {isIncome ? "Income" : "Expense"}
      </span>
    </div>

    <p className="app-muted-text mt-2 text-sm">
      {item.category || "General"}
      {formattedDate ? " • " + formattedDate : ""}
    </p>
  </div>

  <div className="flex flex-wrap items-center gap-4 sm:justify-end">
    <span
      className={
        isIncome
          ? "font-bold text-emerald-600 dark:text-emerald-400"
          : "font-bold text-red-600 dark:text-red-400"
      }
    >
      {isIncome ? "+" : "-"}₹{formattedAmount}
    </span>

    <button
      onClick={() => deleteExpense(item.id)}
      className="rounded bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-700"
    >
      Delete
    </button>
  </div>
</div>


);
}

export default ExpenseCard;
