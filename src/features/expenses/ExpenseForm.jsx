function ExpenseForm({
title,
setTitle,
amount,
setAmount,
type,
setType,
category,
setCategory,
date,
setDate,
addExpense,
}) {
const handleSubmit = (e) => {
e.preventDefault();
addExpense(e);
};

return ( <form
   onSubmit={handleSubmit}
   className="app-card mb-6"
 > <div className="grid gap-4">
<input
type="text"
placeholder="Transaction title..."
value={title}
onChange={(e) => setTitle(e.target.value)}
className="app-input"
required
/>

    <input
      type="number"
      min="0.01"
      step="0.01"
      placeholder="Amount..."
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="app-input"
      required
    />

    <select
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="app-input"
    >
      <option value="expense">Expense</option>
      <option value="income">Income</option>
    </select>

    <input
      type="text"
      placeholder="Category (example: Food, Salary, Bills)..."
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="app-input"
    />

    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="app-input"
      required
    />

    <button
      type="submit"
      className="rounded bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
    >
      Add Transaction
    </button>
  </div>
</form>


);
}

export default ExpenseForm;
