'use script'

//Cargar modulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser')

//Ejecutar express (http)
var app = express();

//Cargar ficheros rutas
var article_routes = require('./rutas/article');

//Middlewares (se ejecuta antes de cargar una ruta)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//CORS (Acceso cruzado entre dominio para permitir llamadas desde cualquier frontend)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Añadir prefijos a rutas / Cargar rutas
app.use('/api', article_routes);

/* EJEMPLO sin rutas ni controller
app.post('/datos-autor', function(req, res) {
    var hey = req.body.hola;
    return res.status(200).send({
        usuario: 'David munoz',
        empresa: 'Uc3m',
        hey
    });
});
*/

//Exportar el modulo (fichero actual)
module.exports = app;