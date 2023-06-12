import React from "react";

const ExpenseItem = ({ expense }) => {
  return (
    <li>
      <div>Time: {expense.date.toString()}</div>
      <div>Expense description: {expense.description}</div>
      <div>Expense amount: {expense.amount}</div>
    </li>
  );
};

export default ExpenseItem;
