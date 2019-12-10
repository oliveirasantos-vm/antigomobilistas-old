const Usuario = require('../models/Usuario');

exports.paginaInicial = (req, res) => {
    if (req.session.log == true) { 
        console.log(req.session.iduser);
        new Usuario().select(`SELECT * FROM usuario WHERE idusuario = '${req.session.iduser}';`, (err, user) => {
            if (err) {
                res.render('Error', { titulo: "Ocorreu um erro", erro: err });
            } else {
                console.log(user);
                res.render('inicial', { titulo: "Antigomobilistas", log: req.session.log, menu: "inicio", usuario: user });
            }
        });
    } else {
        res.render('inicial', { titulo: "Antigomobilistas", log: req.session.log, menu: "inicio" });
    }
};

exports.erro404 = (req, res) => {
    res.render('404', { titulo: "Error - 404" });
}