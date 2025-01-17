import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import ExpenseForm from './Components/ExpenseForm';
import ExpenseList from './Components/ExpenseList';
import axios from 'axios';

function App() {
  const [expenses, setExpenses] = useState([]);

  // Fetch initial expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  // Add new expense in real time
  const addExpense = (newExpense) => {
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
  };


 

  return (
    <>
      <Navbar />
      <ExpenseForm onAddExpense={addExpense} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
    </>
  );
}

export default App;
