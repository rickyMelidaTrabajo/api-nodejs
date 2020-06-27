const express = require('express');
const expresFileUpload = require('express-fileupload');

const app = express();

app.use(expresFileUpload());

//Cargar CORS para realizar peticiones desde frontend
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const rutas = require('./routes/rutas');

app.use('/api', rutas);

module.exports = app;

