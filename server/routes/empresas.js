const express = require('express');
const router = express.Router();
const Empresa = require('../models/Empresa');

// Rota para adicionar uma nova empresa
router.post('/add', async (req, res) => {
  try {
    const novaEmpresa = new Empresa(req.body);
    const empresaSalva = await novaEmpresa.save();
    res.status(201).json(empresaSalva);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar empresa', error });
  }
});

// Rota para listar todas as empresas
router.get('/', async (req, res) => {
  try {
    const empresas = await Empresa.find();
    res.status(200).json(empresas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar empresas', error });
  }
});

// Rota para atualizar uma empresa
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const empresaAtualizada = await Empresa.findByIdAndUpdate(id, req.body, { new: true });
    if (!empresaAtualizada) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }
    res.status(200).json(empresaAtualizada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar empresa', error });
  }
});

// Rota para deletar uma empresa
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const empresaDeletada = await Empresa.findByIdAndDelete(id);
    if (!empresaDeletada) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }
    res.status(200).json({ message: 'Empresa deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a empresa', error });
  }
});

module.exports = router;
