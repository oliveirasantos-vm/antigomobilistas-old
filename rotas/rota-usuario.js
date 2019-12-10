const express = require('express');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + file.originalname);
    }
})

const upload = multer({ storage });

const usuarioController = require('../controllers/UsuarioController');

router.get('/logout', usuarioController.logout);

router.get('/dados', usuarioController.dados);

router.get('/anuncios', usuarioController.anuncios);

router.post('/atualizar', upload.single('foto'), usuarioController.atualizar);

router.post('/remover', usuarioController.remover);

router.post('/senha', usuarioController.senha);

module.exports = router;