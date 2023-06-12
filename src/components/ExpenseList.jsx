import React from "react";
import ExpenseItem from "./ExpenseItem";
import "../styles.css";

const ExpenseList = ({ expenses }) => {
  if (expenses.length === 0) {
    return <p>No expenses found.</p>;
  }

  const lastFiveExpenses = expenses.slice(-5);

  return (
    <div className="list-container">
      <ul>
        {lastFiveExpenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
