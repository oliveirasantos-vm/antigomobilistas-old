const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');


exports.logout = (req, res) => {
    req.session.destroy()
    res.statusCode = 302;
    return res.redirect('/');
}

exports.dados = (req, res) => {
    if (req.session.log) {
        new Usuario().select(`SELECT * FROM usuario WHERE idusuario = '${req.session.iduser}';`, (err, user) => {
            if (err) {
                res.render('Error', { titulo: "Ocorreu um erro", erro: err });
            } else {
                console.log(user);
                res.render('dados', { titulo: 'Meus Dados', log: req.session.log, usuario: user });
            }
        });
    } else {
        res.statusCode = 302;
        res.redirect('/cadastro/login')
    }
}

exports.senha = (req, res) => {
    bcrypt.hash(req.body.pass, 12)
        .then(newPass => {
            new Usuario().updatepassword(req.session.iduser, newPass, (err) => {
                if (err == null) {
                    res.statusCode = 302;
                    res.redirect('/');
                } else {
                    res.render('Error', { titulo: "Ocorreu um erro", erro: err });
                }
            });
        });
}

exports.anuncios = (req, res) => {
    if (req.session.log) {
        new Usuario().select(`SELECT * FROM usuario WHERE idusuario = '${req.session.iduser}';`, (err, user) => {
            if (err) {
                res.render('Error', { titulo: "Ocorreu um erro", erro: err });
            } else {
                console.log(user);
                res.render('anuncios', { titulo: 'Meus Anúncios', log: req.session.log, usuario: user });
            }
        });
    } else {
        res.statusCode = 302;
        res.redirect('/cadastro/login')
    }
}

exports.atualizar = (req, res) => {
    let image;
    if (req.file != undefined) {
        image = "/uploads/" + req.file.filename;
    } else {
        image = req.body.foto2;
    }
    console.log(image);
    new Usuario(req.session.iduser, req.body.name, req.body.email, null, req.body.birthdate, req.body.cpf, req.body.cep, req.body.city, req.body.uf, req.body.mainphone, req.body.secphone, image, null).update((err) => {
        if (err == null) {
            res.statusCode = 302;
            res.redirect('/');
        } else {
            let errtype = /(for key \')(.*)(\')/.exec(err.message);
            if (errtype[2] != null) {
                let errors = ["", ""];
                if (errtype[2] == "email_UNIQUE") {
                    errors[0] = "Esse email já foi cadastrado!";
                } else if (errtype[2] == "cpf_UNIQUE") {
                    errors[1] = "Esse cpf já foi cadastrado!";
                }
                res.render('cadastrar', { titulo: "Cadastrar", usuario: req.body, erros: errors });
            } else {
                res.render('Error', { titulo: "Ocorreu um erro", erro: err });
            }
        }
    });
}

exports.remover = (req, res) => {
    new Usuario().remove(req.session.iduser, (err) => {
        if (err) {
            res.render('Error', { titulo: "Ocorreu um erro", erro: err });
        } else {
            req.session.destroy()
            res.statusCode = 302;
            res.redirect('/');
        }
    });
}