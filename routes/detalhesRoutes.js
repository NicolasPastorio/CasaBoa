const express = require('express');
const router = express.Router();
const detalhesController = require('../controllers/detalhesController');

router.get('/visitar/:idImovel', detalhesController.renderImovelDetalhes);

module.exports = router;