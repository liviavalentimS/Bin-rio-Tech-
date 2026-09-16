const Alerta = require('../models/Alerta');

const alertaController = {
  // POST /api/v1/alertas
  criarAlerta: async (req, res, next) => {
    try {
      const novoAlerta = await Alerta.create(req.body);
      res.status(201).json(novoAlerta);
    } catch (erro) {
      if (erro.name === 'ValidationError') {
        return res.status(400).json({
          erro: 'Erro de validação.',
          detalhes: Object.values(erro.errors).map(e => e.message)
        });
      }
      next(erro);
    }
  },

  // GET /api/v1/alertas
  listarTudo: async (req, res, next) => {
    try {
      const alertas = await Alerta.find();
      res.status(200).json(alertas);
    } catch (erro) {
      next(erro);
    }
  },

  // GET /api/v1/alertas/severidade/:nivel  (Exercício 1)
  buscarPorSeveridade: async (req, res, next) => {
    try {
      const { nivel } = req.params;
      const alertas = await Alerta.find({ nivelSeveridade: nivel });

      if (alertas.length === 0) {
        return res.status(404).json({
          erro: `Nenhum alerta encontrado com severidade '${nivel}'.`
        });
      }

      res.status(200).json(alertas);
    } catch (erro) {
      next(erro);
    }
  }
};

module.exports = alertaController;
