const mongoose = require('mongoose');

const CadastroSchema = new mongoose.Schema({
  nomeCompleto: { type: String, required: true },
  rg: { type: String, required: true },
  cpf: { type: String, required: true },
  pis: { type: String, required: true },
  ctps: { type: String, required: true },
  escala: { type: String, required: true },
  salario: { type: Number, required: true },
  funcao: { type: String, required: true },
  nomePai: { type: String, required: true },
  nomeMae: { type: String, required: true },
  dataAdmissao: { type: Date, required: true },
  data: { type: String, default: null },  // Esses campos não são obrigatórios
  horarioEntrada: { type: String, default: null },
  horarioAlmoco: { type: String, default: null },
  retornoAlmoco: { type: String, default: null },
  horarioSaida: { type: String, default: null },
  horaExtra: { type: String, default: null },
  horaTotal: { type: String, default: null },
  tag: { type: String, default: null },
});

module.exports = mongoose.model('Cadastro', CadastroSchema);
