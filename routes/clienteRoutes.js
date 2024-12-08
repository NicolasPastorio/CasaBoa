const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middleware/auth');

router.get('/cliente', authMiddleware.ensureRole('cliente'), clienteController.dashboard);

router.post('/favoritar', authMiddleware.ensureAuthenticated, clienteController.favoritarImovel);
router.post('/removerFavorito', authMiddleware.ensureAuthenticated, clienteController.desfavoritarImovel);

router.get('/cadastrar', clienteController.showRegister);
router.post('/cadastrar', clienteController.register);

module.exports = router;