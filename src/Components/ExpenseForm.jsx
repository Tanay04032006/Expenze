import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const expenseData = { description, amount, date };

    try {
      const response = await axios.post('http://localhost:5000/api/expenses', expenseData);

      // Immediately update the parent state with the new expense
      onAddExpense(response.data);

      // Clear input fields
      setDescription('');
      setAmount('');
      setDate('');
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center py-10">
        <div>
          <label htmlFor="description" className="px-4">Description</label>
          <input
            className="border-2 border-gray-300"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="amount" className="px-4">Amount</label>
          <input
            className="border-2 border-gray-300"
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="px-4">Date</label>
          <input
            className="border-2 border-gray-300"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button
          className="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded
            mt-4
          "
          type="submit"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
