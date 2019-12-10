const path = require('path');
const db = require('../database');

module.exports = class Usuario {
    constructor(idusuario, nome, email, senha, nascimento, cpf, cep, cidade, estado, telefone, telefone2, foto, admin) {
        this.idusuario = idusuario;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.nascimento = nascimento;
        this.cpf = cpf;
        this.cep = cep;
        this.cidade = cidade;
        this.estado = estado;
        this.telefone = telefone;
        this.telefone2 = telefone2;
        this.foto = foto;
        this.admin = admin;
    }

    create(cb) {
        db.execute(`INSERT INTO usuario(nome, email, senha, nascimento, cpf, cep, cidade, estado, telefone, telefone2, foto)
                    VALUES ("${this.nome}","${this.email}","${this.senha}","${this.nascimento}","${this.cpf}","${this.cep}","${this.cidade}","${this.estado}","${this.telefone}","${this.telefone2}", "${this.foto}");`)
            .then(result => {
                cb(null, result[0].insertId, );
            }).catch(err => {
                cb(err, null);
            });
    }

    select(query, cb) {
        db.execute(query)
            .then(result => {
                console.log(result[0][0]);
                cb(null, result[0][0]);
            })
            .catch(err => { cb(err, null) });
    }

    update(cb) {
        db.execute(`UPDATE usuario SET nome = "${this.nome}", email = "${this.email}", nascimento = "${this.nascimento}", cpf = "${this.cpf}", cep = "${this.cep}", cidade = "${this.cidade}", estado = "${this.estado}", telefone = "${this.telefone}", telefone2 = "${this.telefone2}", foto = "${this.foto}" WHERE idusuario = ${this.idusuario}`)
            .then(result => {
                cb(null);
            })
            .catch(err => { cb(err) });
    }

    updatepassword(idusuario, senha, cb) {
        db.execute(`UPDATE usuario SET senha = "${senha}" WHERE idusuario = ${idusuario}`)
            .then(result => {
                cb(null);
            })
            .catch(err => { cb(err) });
    }

    remove(id, cb) {
        db.execute(`DELETE FROM usuario WHERE idusuario = ${id} `)
            .then(result => {
                cb(null);
            })
            .catch(err => { cb(err) });
    }

}