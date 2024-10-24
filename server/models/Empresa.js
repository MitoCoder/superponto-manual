// server/models/Empresa.js

const mongoose = require('mongoose');

const EmpresaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cnpj: { type: String, required: true, unique: true },
  razaoSocial: { type: String, required: true },
  inscricaoEstadual: { type: String, required: true },
  inscricaoMunicipal: { type: String, required: true },
  logo: { type: String }, // Aqui você pode decidir armazenar a URL da imagem
});

module.exports = mongoose.model('Empresa', EmpresaSchema);
