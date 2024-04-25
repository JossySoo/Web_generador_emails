//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;

const cors = require('cors');

var express = require('express');
var app = express();
var pool = require('./mysql-connector');
const jwt = require('jsonwebtoken')
const routerSegmentos = require('./routes/segmentos')

const YOUR_SECRET_KEY = 'mi llave'
var testUser = {username: 'test', password: '1234'}

const corsOptions = {
    origin: '*',
}

var myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}

var authenticator = function (req, res, next) {
    let autHeader = (req.headers.authorization || '')
    if (autHeader.startsWith('Bearer ')) {
        token = autHeader.split(' ')[1]
    } else {
        res.status(401).send({ message: 'Se requiere un token de tipo Bearer' })
    }
    jwt.verify(token, YOUR_SECRET_KEY, function(err) {
      if(err) {
        res.status(403).send({ message: 'Token inválido' })
      }
    })
    next()
}

// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));
app.use(cors(corsOptions))
app.use(myLogger)

app.use('/segmentos', routerSegmentos)

//=======[ Main module code ]==================================================

// var cb0 = function (req, res, next) {
//     // Hago saneamiento de la request
//     // y luego paso al siguiente callback
//     // si se cumple cierta condición
//     console.log('CB0')
//     next()
// }

// var cb1 = function (req, res, next) {
//     console.log('CB1')
//     next()
// }


var cb2 = function (req, res, next) {
    res.send({'mensaje': 'Hola DAM!'}).status(200)
}

// app.get('/', [cb0, cb1, cb2]);
app.get('/', cb2);

/* app.post('/login', (req, res) => {
    if (req.body) {
        var userData = req.body

        if (testUser.username === userData.username && testUser.password === userData.password) {
            var token = jwt.sign(userData, YOUR_SECRET_KEY)
            res.status(200).send({
                signed_user: userData,
                token: token
            })
        } else {
            res.status(403).send({
                errorMessage: 'Auth required'
            })
        }
    } else {
        res.status(403).send({
            errorMessage: 'Se requiere un usuario y contraseña'
        })
    }
}); */


app.post('/login', (req, res) => {
    if (req.body) {
        var userData = req.body;
        // Consulta a la base de datos para encontrar al usuario
        pool.query('SELECT * FROM USUARIOS WHERE Nombre_Usuario = ?', [userData.username], (error, usersBD) => {
            if (error) {
                return res.status(500).send({ errorMessage: 'Error al consultar la base de datos' });
            }

            if (usersBD.length > 0) {
                passwordBD = usersBD[0].password;

                // Compara la contraseña del formulario con la contraseña en la base de datos
                if (userData.password === passwordBD) {
                    var token = jwt.sign(userData, YOUR_SECRET_KEY)
                    res.status(200).send({
                        signed_user: userData,
                        token: token
                    })
                } else {
                    res.status(403).send({
                        errorMessage: 'Contraseña incorrecta'
                    });
                }
            } else {
                res.status(403).send({
                    errorMessage: 'Usuario no encontrado'
                });
            }
        });
    } else {
        res.status(400).send({
            errorMessage: 'Se requiere un usuario y contraseña'
        });
    }
});


/* app.get('/prueba', authenticator, function(req, res) {
    pool.query('Select * from segmentos_clientes', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    })
}); */

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});
