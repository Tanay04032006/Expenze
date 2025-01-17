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
    <form onSubmit={handleSubmit} className="animate-fadeIn">
      <div className="flex flex-col items-center py-10 max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Add Expense</h2>

        <div className="w-full mb-4">
          <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">Description</label>
          <input
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="w-full mb-4">
          <label htmlFor="amount" className="block text-lg font-medium text-gray-700 mb-2">Amount</label>
          <input
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="w-full mb-6">
          <label htmlFor="date" className="block text-lg font-medium text-gray-700 mb-2">Date</label>
          <input
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button
          className="w-full py-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          type="submit"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
