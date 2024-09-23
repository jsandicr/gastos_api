const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./api/routes/authRoutes');
const expenseRoutes = require('./api/routes/expenseRoutes');
const groupRoutes = require('./api/routes/groupRoutes');
const { initializeApp } = require('firebase/app');

dotenv.config();
const app = express();
app.use(express.json());

const firebaseConfig = {
  apiKey: "AIzaSyCwIhRzQPVFPpNRsKN5tPidnM8RKQaKIt8",
  authDomain: "gastos-6dc2e.firebaseapp.com",
  projectId: "gastos-6dc2e",
  storageBucket: "gastos-6dc2e.appspot.com",
  messagingSenderId: "70615396986",
  appId: "1:70615396986:web:d6362c696be89fc75001c3"
};

initializeApp(firebaseConfig)

// Rutas
app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);
app.use('/groups', groupRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
