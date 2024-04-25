//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;

const cors = require('cors');

var express = require('express');
var app = express();
var pool = require('./mysql-connector');
const jwt = require('jsonwebtoken')
const routerSegmentos = require('./routes/segmentos')
let lastuser=0

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
                lastuser=usersBD[0].usuario_ID
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


app.post('/emails', (req, res) => {
    const {segmentoCliente, titulo1, titulo2, fraseinicial, parrafo, haveTasa, tasa, legal_tasa, html } = req.body;
    // Queda pendiente hacer mejora para conseguir el usuario mediante el token
    usuario_ID=lastuser
    now = new Date()
    fecha_creacion= now.toISOString().slice(0, 10)
    console.log([usuario_ID, segmentoCliente, fecha_creacion, titulo1, titulo2, fraseinicial, parrafo, haveTasa, tasa, legal_tasa])
    segmento=segmentoCliente

    const sql = `INSERT INTO emails_generados 
                 (usuario_ID, segmento, fecha_creacion, titulo1, titulo2, fraseinicial, parrafo, haveTasa, tasa, legal_tasa, html) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    pool.query(sql, [usuario_ID, segmento, fecha_creacion, titulo1, titulo2, fraseinicial, parrafo, haveTasa, tasa, legal_tasa, html], (err, results) => {
    if (err) {
        console.error('Error al insertar en la base de datos', err);
        res.status(500).send('Error en el servidor');
    } else {
        // Envía el ID al frontend
        res.status(201).send({ message: 'Email insertado correctamente', id: results.insertId });
    }
    }); 
              
});


app.get('/emails/:emailId', (req, res) => {
    const emailId = req.params.emailId; 
    console.log("Recibido "+emailId)
    const query = 'SELECT * FROM emails_generados WHERE email_ID = ?';
    
    pool.query(query, [emailId], (error, results) => {
        if (error) {
            // Manejo de errores de la base de datos
            console.error('Error al realizar la consulta', error);
            res.status(500).send('Error al consultar la base de datos');
        } else if (results.length > 0) {
            // Envía los datos del email si la consulta fue exitosa y se encontró el email
            console.log(results[0])
            res.json(results[0]);
        } else {
            // Si no se encontraron resultados, envía un 404 Not Found
            res.status(404).send('Email no encontrado');
        }
    });
});


app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});