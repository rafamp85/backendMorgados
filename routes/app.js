
var express = require('express');
var app = express();

var Register = require('../models/register');

app.get('/', (req, res, next) =>  {

    Register.find( {}, ( err, registers ) => {
        
        if ( err ) {
            return res.status( 500 ).json({
                ok: false,
                message: 'Error cargando Registros',
                errors: err
            });
        }

        res.status( 200 ).json({
            ok: true,
            registers
        });

    });

});;


module.exports = app;