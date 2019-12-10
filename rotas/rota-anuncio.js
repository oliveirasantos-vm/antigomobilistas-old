const express = require('express');
const router = express.Router();

const anuncioController = require('../controllers/AnuncioController');

router.get('/', anuncioController.inicio);

router.get('/cadastrar', anuncioController.cadastrar);

module.exports = router;