// server/models/Login.js

const mongoose = require('mongoose');

// Definição do esquema de Usuário
const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Usuário deve ser único
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email deve ser único
  },
  password: {
    type: String,
    required: true,
  },
});

// Exporta o modelo Login
module.exports = mongoose.model('Login', loginSchema);
