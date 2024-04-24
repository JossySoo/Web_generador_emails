const express = require('express')
const pool = require('../../mysql-connector')

const routerSegmentos = express.Router()

routerSegmentos.get('/', function (req, res) {
    pool.query('Select * from segmentos_clientes', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

module.exports = routerSegmentos