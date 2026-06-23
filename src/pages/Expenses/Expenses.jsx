import { useState, useEffect } from "react";
import api from "../../services/api";

import PageWrapper from "../../components/common/PageWrapper";
import ExpenseForm from "../../features/expenses/ExpenseForm";
import ExpenseList from "../../features/expenses/ExpenseList";
import ExpenseStats from "../../components/expenses/ExpenseStats";

function Expenses() {
const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [type, setType] = useState("expense");
const [category, setCategory] = useState("General");
const [date, setDate] = useState("");
const [expenses, setExpenses] = useState([]);
const [loading, setLoading] = useState(true);

const fetchExpenses = async () => {
try {
setLoading(true);


  const response = await api.get("/expenses");

  setExpenses(response.data);
} catch (error) {
  console.log(
    "GET EXPENSES ERROR:",
    error.response?.data || error.message
  );

  alert("Expenses load nathi thai.");
} finally {
  setLoading(false);
}


};

useEffect(() => {
fetchExpenses();
}, []);

const addExpense = async (e) => {
if (e) {
e.preventDefault();
}


if (!title.trim() || !amount || !date) {
  alert("Title, amount ane date lakho.");
  return;
}

try {
  const response = await api.post("/expenses", {
    title: title.trim(),
    amount: Number(amount),
    type: type,
    category: category.trim() || "General",
    expense_date: date,
  });

  setExpenses((oldExpenses) => [
    response.data,
    ...oldExpenses,
  ]);

  setTitle("");
  setAmount("");
  setType("expense");
  setCategory("General");
  setDate("");
} catch (error) {
  console.log(
    "ADD EXPENSE ERROR:",
    error.response?.data || error.message
  );

  alert(
    error.response?.data?.error ||
      "Transaction add nathi thai."
  );
}


};

const deleteExpense = async (id) => {
try {
await api.delete("/expenses/" + id);


  setExpenses((oldExpenses) =>
    oldExpenses.filter((item) => item.id !== id)
  );
} catch (error) {
  console.log(
    "DELETE EXPENSE ERROR:",
    error.response?.data || error.message
  );

  alert("Transaction delete nathi thai.");
}


};

const income = expenses
.filter((item) => item.type === "income")
.reduce(
(acc, item) => acc + Number(item.amount),
0
);

const expense = expenses
.filter((item) => item.type === "expense")
.reduce(
(acc, item) => acc + Number(item.amount),
0
);

const balance = income - expense;

return ( <PageWrapper> <div className="p-6 text-slate-900 dark:text-white"> <h1 className="mb-6 text-3xl font-bold">
Expense Tracker </h1>


    <ExpenseStats
      income={income}
      expense={expense}
      balance={balance}
    />

    <ExpenseForm
      title={title}
      setTitle={setTitle}
      amount={amount}
      setAmount={setAmount}
      type={type}
      setType={setType}
      category={category}
      setCategory={setCategory}
      date={date}
      setDate={setDate}
      addExpense={addExpense}
    />

    {loading ? (
      <p className="text-slate-400">
        Loading transactions...
      </p>
    ) : (
      <ExpenseList
        expenses={expenses}
        deleteExpense={deleteExpense}
      />
    )}
  </div>
</PageWrapper>


);
}

export default Expenses;
