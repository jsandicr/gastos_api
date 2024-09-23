const { db } = require("../../firebaseConfig");
const bcrypt = require('bcryptjs');

// Buscar usuario por email
const findUserByEmail = async (email) => {
    const userRef = db.collection('users').where('email', '==', email);
    const userSnapshot = await userRef.get();
    return userSnapshot.empty ? null : userSnapshot.docs[0].data();
};

// Crear usuario con email, password y nombre
const createUser = async (email, password, name) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword, name };
    const userRef = await db.collection('users').add(newUser); // Añadir nuevo usuario
    return { id: userRef.id, ...newUser };  // Retornar el usuario con su ID de Firebase
};

// Validar contraseña con bcrypt
const validatePassword = async (user, password) => {
    return await bcrypt.compare(password, user.password);
};

module.exports = { findUserByEmail, createUser, validatePassword };