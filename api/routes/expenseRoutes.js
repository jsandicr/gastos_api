const express = require('express');
const { addExpense, closeExpense, getExpenses, deleteExpense, updateExpense } = require('../controllers/expenseController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/add/:idGroup/:email', authenticateToken, addExpense);
router.post('/close/:idGroup/:email/:expenseId', authenticateToken, closeExpense);
router.put('/update/:idGroup/:email/:expenseId', authenticateToken, updateExpense);
router.delete('/delete/:idGroup/:email/:expenseId', authenticateToken, deleteExpense);
router.get('/:idGroup', authenticateToken, getExpenses);

module.exports = router;