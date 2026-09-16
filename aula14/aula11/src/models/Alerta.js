const mongoose = require('mongoose');

const alertaSchema = new mongoose.Schema({
  equipamentoId: {
    type: String,
    required: [true, 'O ID do equipamento é obrigatório']
  },
  nivelSeveridade: {
    type: String,
    enum: ['BAIXO', 'MEDIO', 'CRITICO'],
    default: 'MEDIO'
  },
  temperaturaMedia: {
    type: Number,
    required: [true, 'A temperatura média é obrigatória']
  },
  tags: {
    type: [String],
    default: []
  }
}, { timestamps: true });

const Alerta = mongoose.model('Alerta', alertaSchema);

module.exports = Alerta;
