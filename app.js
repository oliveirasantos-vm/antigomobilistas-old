const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const cookieparser = require('cookie-parser');


const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(
    session(
        {
            secret: 'Chave longa que é utilizada para criptografia',
            resave: false,
            saveUninitialized: false
        }
    ));

app.use(cookieparser());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const modulo_anuncio = require('./rotas/rota-anuncio');
app.use('/anunciar', modulo_anuncio);

const modulo_usuario = require('./rotas/rota-usuario');
app.use('/usuario', modulo_usuario);

const modulo_cadastro = require('./rotas/rota-cadastro');
app.use('/cadastro', modulo_cadastro);


const modulo_sistema = require('./rotas/rota-sistema');
app.use(modulo_sistema);


app.listen(3000, () => { console.log("Escutando na porta 3000...") })