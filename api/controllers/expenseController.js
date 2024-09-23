const ExpenseModel = require('../models/expenseModel');

// Agregar un gasto
const addExpense = async (req, res) => {
    try {
        const { idGroup, email } = req.params;
        const { expenses, description, members } = req.body;

        const newExpense = {
            id: generateUniqueId(),
            description,
            expenses,
            members,
            status: 'incomplete',
            createdBy: email,
            createdAt: new Date()
        };

        const expenseAdded = await ExpenseModel.addExpenseToGroup(idGroup, newExpense);
        if (!expenseAdded) return res.status(404).json({ error: 'Grupo no encontrado' });

        res.status(201).json({ message: 'Gasto agregado exitosamente', expense: newExpense });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el gasto' });
    }
};

// Cerrar un gasto
const closeExpense = async (req, res) => {
    try {
        const { idGroup, expenseId } = req.params;

        const expenseClosed = await ExpenseModel.closeExpenseInGroup(idGroup, expenseId);
        if (!expenseClosed) return res.status(404).json({ error: 'Gasto no encontrado' });

        res.status(200).json({ message: 'Gasto cerrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al cerrar el gasto' });
    }
};

// Obtener gastos
const getExpenses = async (req, res) => {
    try {
        const { idGroup } = req.params;

        const expenses = await ExpenseModel.getExpensesByGroupId(idGroup);
        if (!expenses) return res.status(404).json({ error: 'Grupo no encontrado' });

        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los gastos' });
    }
};

// Actualizar un gasto
const updateExpense = async (req, res) => {
    try {
        const { idGroup, expenseId } = req.params;
        const { expenses, description, members } = req.body;

        const updatedExpense = await ExpenseModel.updateExpenseInGroup(idGroup, expenseId, {
            description,
            expenses,
            members,
            updatedAt: new Date()
        });

        if (!updatedExpense) return res.status(404).json({ error: 'Gasto no encontrado' });

        res.status(200).json({ message: "Gasto actualizado exitosamente", expense: updatedExpense });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el gasto' });
    }
};

// Eliminar un gasto
const deleteExpense = async (req, res) => {
    try {
        const { idGroup, expenseId } = req.params;

        const deleted = await ExpenseModel.deleteExpenseFromGroup(idGroup, expenseId);
        if (!deleted) return res.status(404).json({ error: 'Gasto no encontrado' });

        res.status(200).json({ message: "Gasto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el gasto' });
    }
};

// Generar ID único
let expenseCounter = 0;

function generateUniqueId() {
    const timestamp = new Date().getTime();
    expenseCounter += 1;
    return `${timestamp}-${expenseCounter}`;
}

module.exports = { addExpense, closeExpense, getExpenses, updateExpense, deleteExpense };