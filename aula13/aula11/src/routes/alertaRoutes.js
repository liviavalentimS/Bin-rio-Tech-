const express = require('express');
const router = express.Router();
const alertaController = require('../controllers/alertaController');

router.post('/', alertaController.criarAlerta);
router.get('/', alertaController.listarTudo);
router.get('/severidade/:nivel', alertaController.buscarPorSeveridade);

module.exports = router;
