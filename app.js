// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var http = require('http');

// Probando servidor Seguro
var fs = require('fs');
var https = require('https');

// Inicializar variables
var app = express();
//var server = http.createServer(app);
var server = https.createServer({
  key: fs.readFileSync( 'morgados.key' ),
  cert: fs.readFileSync( 'morgados.crt' )
}, app);

var cronJob = require( './cronjobs/cronDaily' );


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
var notificationRoutes = require('./routes/notification');


// ### AMBIENTE LOCAL
 mongoose.connect( 'mongodb://localhost:27017/morgadosDB', { useNewUrlParser: true }, ( err, res ) => {
// mongoose.connect( 'mongodb+srv://dbUser:dbUserPassword@morgado-vsfwv.mongodb.net/test?retryWrites=true&w=majority',  { useNewUrlParser: true }, ( err, res ) => {    

    if ( err ) throw err;

    console.log('Database is: \x1b[32m%s\x1b[0m', 'online');

}).catch( console.log );


app.set('port', process.env.PORT || 3000);

// Rutas
app.use( '/register', registerRoutes );
app.use( '/notification', notificationRoutes );
app.use( '/', appRoutes );

cronJob.getRegistersByDate();

// Escuchar peticiones
server.listen( app.get('port'), () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});
