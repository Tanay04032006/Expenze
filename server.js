import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/expenses');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Expense Schema and Model
const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: String,
});

const Expense = mongoose.model('Expense', expenseSchema);

// POST route to add expense
app.post('/api/expenses', async (req, res) => {
  const { description, amount, date } = req.body;
  const expense = new Expense({ description, amount, date });

  try {
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to fetch all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find(); // Fetch all expenses from the database
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE route to delete an expense by ID
app.delete('/api/expenses/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(id); // Delete the expense by ID
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense deleted successfully', deletedExpense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
