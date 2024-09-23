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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app