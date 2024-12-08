const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

router.get('/admin', authMiddleware.ensureRole('admin'), adminController.dashboard);
router.post('/adicionarVendedor', authMiddleware.ensureRole('admin'), adminController.adicionarVendedor);

module.exports = router;