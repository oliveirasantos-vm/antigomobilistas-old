const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

exports.login = (req, res) => {
    res.render('login', { titulo: "Login" });
}

exports.cadastrar = (req, res) => {
    res.render('cadastrar', { titulo: "Cadastrar" });
}

exports.recadastrar = (req, res) => {
    res.render('recadastrar', { titulo: "Recadastrar" });
}

exports.postlogin = (req, res) => {
    new Usuario().select(`SELECT * FROM usuario WHERE email = '${req.body.email}';`, (err, user) => {
        if (err) {
            res.render('Error', { titulo: "Ocorreu um erro", erro: err });
        } else {
            let erros = ["", ""]
            if (user != undefined) {
                bcrypt.compare(req.body.pass, user.senha)
                    .then(result => {
                        if (result) {
                            erros = ["", ""];
                            req.session.log = true;
                            req.session.iduser = user.idusuario;
                            req.session.whenLogged = new Date();
                            if (req.body.remember == "on") {
                                let hour = 3600 * 24 * 700;
                                req.session.cookie.expires = new Date(Date.now() + hour);
                                req.session.cookie.maxAge = hour;
                            } else {
                                req.session.cookie.expires = false;
                            }
                            res.statusCode = 302;
                            res.redirect('/');
                        } else {
                            erros = ["", "Senha incorreta!"];
                            res.render('login', { titulo: "Login", email: req.body.email, erros: erros });
                        }
                    })
                    .catch(err => {
                        res.render('Error', { titulo: "Ocorreu um erro", erro: err });
                    })
            } else {
                erros = ["Email não cadastrado!", ""];
                res.render('login', { titulo: "Login", email: req.body.email, erros: erros });
            }
        }
    });
}

exports.postcadastrar = (req, res) => {
    bcrypt.hash(req.body.pass, 12)
        .then(newPass => {
            new Usuario(null, req.body.name, req.body.email, newPass, req.body.birthdate, req.body.cpf, req.body.cep, req.body.city, req.body.uf, req.body.mainphone, req.body.secphone, "/images/user.png", false).create((err, id) => {
                if (err == null) {
                    req.session.log = true;
                    req.session.iduser = id;
                    req.session.whenLogged = new Date();
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
        });
}

exports.postrecadastrar = (req, res) => {
    res.write('recadastro');
    res.end();
}