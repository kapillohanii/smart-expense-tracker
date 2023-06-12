import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles.css';

const ExpenseForm = ({ onExpenseSubmit }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Check if any of the form fields are empty
    if (!amount || !description || !date) {
      alert('Entry should not be empty');
      return;
    }

    // Create an expense object using the form input values
    const expense = {
      id: uuidv4(),
      amount: parseFloat(amount),
      description,
      date: new Date(date)
    };

    // Pass the expense object to the onExpenseSubmit callback function
    onExpenseSubmit(expense);

    // Reset the form input values
    setAmount('');
    setDescription('');
    setDate('');
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <br />
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ExpenseForm;

