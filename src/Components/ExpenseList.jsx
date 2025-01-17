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
      <h2>Expense List</h2>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense._id}>
              <strong>{expense.description}</strong> - ${expense.amount} on{' '}
              {new Date(expense.date).toLocaleDateString()}
              <button onClick={() => handleDelete(expense)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total Amount: ${expenses.reduce((total, expense) => total + expense.amount, 0)}</p>

    </div>
  );
};

export default ExpenseList;
