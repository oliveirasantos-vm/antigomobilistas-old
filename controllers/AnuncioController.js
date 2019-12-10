const Usuario = require('../models/Usuario');

exports.inicio = (req, res) => {
    if (req.session.log == true) {
        console.log(req.session.iduser);
        new Usuario().select(`SELECT * FROM usuario WHERE idusuario = '${req.session.iduser}';`, (err, user) => {
            if (err) {
                res.render('Error', { titulo: "Ocorreu um erro", erro: err });
            } else {
                console.log(user);
                res.render('anuncie-login', { titulo: "Anuncie Conosco!", log: req.session.log, menu: "anunciar", usuario: user });
            }
        });
    } else {
        res.render('anuncie-login', { titulo: "Anuncie Conosco!", log: req.session.log, menu: "anunciar" });
    }
}

exports.cadastrar = (req, res) => {
    //if (req.session.log) {
    res.render('anunciar', { titulo: "Anuncie Conosco!", log: req.session.log });
    //} else {
    //res.statusCode = 302;
    //res.redirect('/cadastro/login');
    //}
}