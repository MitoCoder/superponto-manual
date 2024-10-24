const mongoose = require('mongoose');

const TabelaPontoSchema = new mongoose.Schema({
    colaborador: { type: mongoose.Schema.Types.ObjectId, ref: 'Colaborador', required: true },
    data: { type: Date, required: true },
    horarioEntrada: { type: String, default: '' },
    horarioAlmoco: { type: String, default: '' },
    retornoAlmoco: { type: String, default: '' },
    horarioSaida: { type: String, default: '' },
    tag: { type: String, default: 'NORMAL' }, // Campo de tag
}, { timestamps: true });

// Criando índice composto para garantir que colaborador e data sejam únicos juntos
TabelaPontoSchema.index({ colaborador: 1, data: 1 }, { unique: true });

const TabelaPonto = mongoose.model('TabelaPonto', TabelaPontoSchema);
module.exports = TabelaPonto;
