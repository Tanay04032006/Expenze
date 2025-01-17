import React from 'react';

const ExpenseList = ({ expenses, setExpenses }) => {
  const handleDelete = async (expenseToDelete) => {
    try {
      const response = await fetch(`http://localhost:5000/api/expenses/${expenseToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }

      const updatedExpenses = expenses.filter((expense) => expense._id !== expenseToDelete._id);
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className='flex flex-col items-center py-10'>
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">Expense List</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses added yet.</p>
      ) : (
        <ul className="w-full space-y-4">
          {expenses.map((expense) => (
            <li
              key={expense._id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105"
            >
              <div>
                <strong className="text-lg text-gray-800">{expense.description}</strong>
                <p className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold text-green-600">${expense.amount}</span>
                <button
                  onClick={() => handleDelete(expense)}
                  className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-700 transition-all duration-300 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="text-xl font-semibold mt-6">
        Total Amount: $
        {expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2)}
      </p>
    </div>
  );
};

export default ExpenseList;
