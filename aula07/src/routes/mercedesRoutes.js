const express = require('express');
const router = express.Router();
const { listarFrota, cadastrarCaminhao } = require('../controllers/mercedesController');

router.get('/', listarFrota);
router.post('/', cadastrarCaminhao);

module.exports = router;
