// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});



// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importar rutas
var appRoutes = require('./routes/app');
var registerRoutes = require('./routes/register');


// Conexión a la base de datos
//mongoose.connection.openUri('mongodb://localhost:27017/morgadosDB', ( err, res ) => {
mongoose.connection.openUri('mongodb+srv://dbUser:dbUserPassword@morgado-vsfwv.mongodb.net/test?retryWrites=true', ( err, res ) => {

    if ( err ) throw err;

    console.log('Database is: \x1b[32m%s\x1b[0m', 'online');
});


// Rutas
app.use( '/register', registerRoutes );
app.use( '/', appRoutes );


// Escuchar peticiones
app.listen( 3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});