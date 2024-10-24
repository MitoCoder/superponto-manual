const express = require('express');
const router = express.Router();
const TabelaPonto = require('../models/TabelaPonto');

// Rota para gerar os pontos do colaborador para um mês específico
router.post('/generate', async (req, res) => {
    const { colaboradorId, mes, ano } = req.body;

    if (!colaboradorId || !mes || !ano) {
        return res.status(400).json({ error: 'Colaborador, mês e ano são obrigatórios.' });
    }

    const diasDoMes = new Date(ano, mes, 0).getDate(); // Número de dias no mês

    try {
        // Verificar se já existem registros para esse colaborador no mês/ano
        const registrosExistentes = await TabelaPonto.find({
            colaborador: colaboradorId,
            data: {
                $gte: new Date(ano, mes - 1, 1),
                $lt: new Date(ano, mes, 1)
            }
        });

        if (registrosExistentes.length > 0) {
            return res.status(400).json({ error: 'Já existem registros para este colaborador neste mês.' });
        }

        const registros = [];

        // Criar um registro para cada dia do mês
        for (let dia = 1; dia <= diasDoMes; dia++) {
            const data = new Date(ano, mes - 1, dia);

            const novoRegistro = new TabelaPonto({
                colaborador: colaboradorId,
                data: data,
                horarioEntrada: '',
                horarioAlmoco: '',
                retornoAlmoco: '',
                horarioSaida: '',
                tag: 'NORMAL',
            });
            registros.push(novoRegistro);
        }

        await TabelaPonto.insertMany(registros);
        return res.status(201).json(registros);
    } catch (error) {
        console.error('Erro ao gerar pontos:', error);
        return res.status(500).json({ error: 'Erro ao gerar pontos.' });
    }
});

// Rota para obter registros existentes
router.get('/:colaboradorId/:mes/:ano', async (req, res) => {
    const { colaboradorId, mes, ano } = req.params;

    try {
        const registros = await TabelaPonto.find({
            colaborador: colaboradorId,
            data: {
                $gte: new Date(ano, mes - 1, 1),
                $lt: new Date(ano, mes, 1)
            }
        });
        res.json(registros);
    } catch (error) {
        console.error('Erro ao buscar registros:', error);
        res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
});

// Rota para atualizar horário
router.put('/update/:id', async (req, res) => {
    try {
        const updatedRecord = await TabelaPonto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRecord) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }
        res.json(updatedRecord);
    } catch (error) {
        console.error('Erro ao atualizar registro:', error);
        res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
});

module.exports = router;
