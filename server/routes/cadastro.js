const express = require('express');
const router = express.Router();
const Cadastro = require('../models/Cadastro');

// Rota para criar um novo cadastro
router.post('/', async (req, res) => {
  const { 
    nomeCompleto, rg, cpf, pis, ctps, escala, salario, funcao, 
    nomePai, nomeMae, dataAdmissao 
  } = req.body;

  const cadastro = new Cadastro({
    nomeCompleto,
    rg,
    cpf,
    pis,
    ctps,
    escala,
    salario,
    funcao,
    nomePai,
    nomeMae,
    dataAdmissao,
    data: null,  // Campos opcionais com valor default null
    horarioEntrada: null,
    horarioAlmoco: null,
    retornoAlmoco: null,
    horarioSaida: null,
    horaExtra: null,
    horaTotal: null,
    tag: null,
  });

  try {
    const novoCadastro = await cadastro.save();
    res.status(201).json(novoCadastro);
  } catch (error) {
    console.error('Erro ao salvar cadastro:', error);
    res.status(400).json({ message: error.message });
  }
});

// Rota para listar todos os cadastros
router.get('/', async (req, res) => {
  try {
    const cadastros = await Cadastro.find();
    res.json(cadastros);
  } catch (error) {
    console.error('Erro ao listar cadastros:', error);
    res.status(500).json({ message: error.message });
  }
});

// Rota para atualizar um cadastro existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { 
    nomeCompleto, rg, cpf, pis, ctps, escala, salario, funcao, 
    nomePai, nomeMae, dataAdmissao, data, horarioEntrada, horarioAlmoco, 
    retornoAlmoco, horarioSaida, horaExtra, horaTotal, tag 
  } = req.body;

  try {
    const cadastro = await Cadastro.findByIdAndUpdate(id, {
      nomeCompleto,
      rg,
      cpf,
      pis,
      ctps,
      escala,
      salario,
      funcao,
      nomePai,
      nomeMae,
      dataAdmissao,
      data,                // Atualiza ou mantém null
      horarioEntrada,      // Atualiza ou mantém null
      horarioAlmoco,       // Atualiza ou mantém null
      retornoAlmoco,       // Atualiza ou mantém null
      horarioSaida,        // Atualiza ou mantém null
      horaExtra,           // Atualiza ou mantém null
      horaTotal,           // Atualiza ou mantém null
      tag,                 // Atualiza ou mantém null
    }, { new: true });

    if (!cadastro) {
      return res.status(404).json({ message: 'Cadastro não encontrado' });
    }

    res.json(cadastro);
  } catch (error) {
    console.error('Erro ao atualizar cadastro:', error);
    res.status(500).json({ message: error.message });
  }
});

// Rota para deletar um cadastro existente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const cadastro = await Cadastro.findByIdAndDelete(id);

    if (!cadastro) {
      return res.status(404).json({ message: 'Cadastro não encontrado' });
    }

    res.json({ message: 'Cadastro deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar cadastro:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
