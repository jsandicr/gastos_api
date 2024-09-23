const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');
const users = require('../models/authModel');

const register = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const existingUser = await users.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: true, msg: 'Usuario ya registrado' });
        }

        const newUser = await users.createUser(email, password, name);
        res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
    } catch (error) {
        res.status(500).json({ error: true, msg: 'Error al registrar usuario', details: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await users.findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: true, msg: 'Usuario o contraseña incorrectos' });
        }

        const validPassword = await users.validatePassword(user, password);
        if (!validPassword) {
            return res.status(400).json({ error: true, msg: 'Usuario o contraseña incorrectos' });
        }

        const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });
        res.json({ email: user.email, token });
    } catch (error) {
        res.status(500).json({ error: true, msg: 'Error durante el login', details: error.message });
    }
};

module.exports = { register, login };