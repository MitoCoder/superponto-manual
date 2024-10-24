// server/routes/login.js

const express = require('express');
const bcrypt = require('bcrypt');
const Login = require('../models/Login'); // Importa o modelo Login
const router = express.Router();

// Rota para registro
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Verifica se o usuário já existe
  const existingUser = await Login.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Usuário já existe!' });
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria um novo usuário
  const newUser = new Login({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário.', error });
  }
});

// Rota para login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Verifica se o usuário existe
  const user = await Login.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado!' });
  }

  // Verifica a senha
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Senha incorreta!' });
  }

  res.status(200).json({ message: 'Login bem-sucedido!' });
});

module.exports = router;
