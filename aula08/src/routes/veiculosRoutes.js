const express = require('express');
const router = express.Router();
const veiculosController = require('../controllers/veiculosController');

router.get('/', veiculosController.listarTodos);
router.post('/', veiculosController.criar);
router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const atualizado = await db('veiculos').where({ id }).update({ status });

    if (!atualizado) {
      return res.status(404).json({ erro: 'Veículo não encontrado' });
    }

    res.json({ mensagem: 'Status atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar status', detalhes: error.message });
  }
	}); 
module.exports = router;
