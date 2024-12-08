const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const vendedorController = require('../controllers/vendedorController');
const authMiddleware = require('../middleware/auth');

router.use(fileUpload());

router.get('/vendedor', authMiddleware.ensureRole('vendedor'), vendedorController.dashboard);
router.post('/vendedor/categorias', authMiddleware.ensureRole('vendedor'), vendedorController.createCategoria);
router.post('/vendedor/adicionar-imovel', authMiddleware.ensureRole('vendedor'), vendedorController.addImovel)

module.exports = router;