function ExpenseStats({
  income,
  expense,
  balance,
}) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      <div className="bg-green-500 text-white p-5 rounded-xl">
        <h3>Income</h3>
        <p className="text-3xl font-bold">
          ₹{income}
        </p>
      </div>

      <div className="bg-red-500 text-white p-5 rounded-xl">
        <h3>Expense</h3>
        <p className="text-3xl font-bold">
          ₹{expense}
        </p>
      </div>

      <div className="bg-blue-500 text-white p-5 rounded-xl">
        <h3>Balance</h3>
        <p className="text-3xl font-bold">
          ₹{balance}
        </p>
      </div>
    </div>
  );
}

export default ExpenseStats;