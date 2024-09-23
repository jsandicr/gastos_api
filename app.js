const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./api/routes/authRoutes');
const expenseRoutes = require('./api/routes/expenseRoutes');
const groupRoutes = require('./api/routes/groupRoutes');

dotenv.config();
const app = express();
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);
app.use('/groups', groupRoutes);
app.use('/', ()=> {
    return "Running"
})

module.exports = app;