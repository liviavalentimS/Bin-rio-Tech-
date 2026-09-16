const express = require('express');
const router = express.Router();
const manutencaoController = require('../controllers/manutencaoController');

router.post('/', manutencaoController.criar);
router.get('/', manutencaoController.listarComFiltros);
router.get('/busca-placa', manutencaoController.buscarPorPlaca);
router.patch('/:id/status', manutencaoController.atualizarStatus);
router.post('/:id/pecas', manutencaoController.adicionarPeca);
router.delete('/:id', manutencaoController.excluir);

module.exports = router;;
