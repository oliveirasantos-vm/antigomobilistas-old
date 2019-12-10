const express = require('express');
const router = express.Router();

const sistemaController = require('../controllers/SistemaController');

router.get('/', sistemaController.paginaInicial);

router.get('*', sistemaController.erro404);

module.exports = router;