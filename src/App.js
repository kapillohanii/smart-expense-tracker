import React, { useState } from "react";
import ExpenseChart from "./components/ExpenseChart";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./styles.css";
import titleImage from "./title.png";

const MyComponent = () => {
  const [expenses, setExpenses] = useState([]);

  const handleExpenseSubmit = (expense) => {
    // Add the new expense to the expenses list
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  return (
    <div className="container">
      <img src={titleImage} alt="Title" />
      <h2 className="section-title">Add Expense</h2>
      <ExpenseForm onExpenseSubmit={handleExpenseSubmit} />
      <h2 className="section-title">Expense List</h2>
      <ExpenseList expenses={expenses} />
      <h2 className="section-title">Expense Chart</h2>
      <ExpenseChart expenses={expenses} />
    </div>
  );
};

export default MyComponent;


