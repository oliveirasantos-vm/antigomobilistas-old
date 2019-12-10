const express = require('express');
const router = express.Router();

const cadastroController = require('../controllers/CadastroController');


router.get('/login', cadastroController.login);

router.get('/cadastrar', cadastroController.cadastrar);

router.get('/recadastrar', cadastroController.recadastrar);

router.post('/login', cadastroController.postlogin);

router.post('/cadastrar', cadastroController.postcadastrar);

router.post('/recadastrar', cadastroController.postrecadastrar);

module.exports = router;