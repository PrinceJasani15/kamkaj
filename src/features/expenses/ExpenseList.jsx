import ExpenseCard from "./ExpenseCard";

function ExpenseList({ expenses, deleteExpense }) {
if (expenses.length === 0) {
return ( <div className="app-empty-state p-10">
No transactions found. Add your first income or expense. </div>
);
}

return ( <div className="space-y-4">
{expenses.map((item) => ( <ExpenseCard
       key={item.id}
       item={item}
       deleteExpense={deleteExpense}
     />
))} </div>
);
}

export default ExpenseList;
