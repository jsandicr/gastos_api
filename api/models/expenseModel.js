const GroupModel = require('./groupModel');

// Obtener todos los gastos de un grupo
const getExpensesByGroupId = async (groupId) => {
    const group = await GroupModel.getGroupById(groupId);
    if (!group) return null;
    return group.expenses;
};

// Agregar un nuevo gasto a un grupo
const addExpenseToGroup = async (groupId, expense) => {
    const group = await GroupModel.getGroupById(groupId);
    if (!group) return null;

    group.expenses.push(expense);
    await GroupModel.updateGroup(groupId, { expenses: group.expenses });
    return expense;
};

// Cerrar un gasto en un grupo
const closeExpenseInGroup = async (groupId, expenseId) => {
    const group = await GroupModel.getGroupById(groupId);
    if (!group) return null;

    const expense = group.expenses.find(exp => exp.id === expenseId);
    if (!expense) return null;

    expense.status = 'complete';
    await GroupModel.updateGroup(groupId, { expenses: group.expenses });
    return expense;
};

// Actualizar un gasto en un grupo
const updateExpenseInGroup = async (groupId, expenseId, updatedExpense) => {
    const group = await GroupModel.getGroupById(groupId);
    if (!group) return null;

    const expenseIndex = group.expenses.findIndex(exp => exp.id === expenseId);
    if (expenseIndex === -1) return null;

    group.expenses[expenseIndex] = { ...group.expenses[expenseIndex], ...updatedExpense };
    await GroupModel.updateGroup(groupId, { expenses: group.expenses });
    return group.expenses[expenseIndex];
};

// Eliminar un gasto de un grupo
const deleteExpenseFromGroup = async (groupId, expenseId) => {
    const group = await GroupModel.getGroupById(groupId);
    if (!group) return null;

    const expenseIndex = group.expenses.findIndex(exp => exp.id === expenseId);
    if (expenseIndex === -1) return null;

    group.expenses.splice(expenseIndex, 1);
    await GroupModel.updateGroup(groupId, { expenses: group.expenses });
    return true;
};

module.exports = {
    getExpensesByGroupId,
    addExpenseToGroup,
    closeExpenseInGroup,
    updateExpenseInGroup,
    deleteExpenseFromGroup
};