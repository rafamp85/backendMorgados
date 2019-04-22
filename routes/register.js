var express = require('express');
var app = express();

var Register = require('../models/register');


// ==================================
// Obtener todos los Registros
// ==================================
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

});


// ==================================
// Crear un nuevo Registro
// ==================================
app.post( '/', ( req, res ) => {

    var body = req.body;

    var register = new Register({
        name: body.name,
        street: body.street, 
        colony: body.colony,
        reference: body.reference,
        phone: body.phone,
        nextVisit: body.nextVisit
    });

    register.save( (err, registerCreated) => {

        if ( err ) {
            return res.status( 400 ).json({
                ok: false,
                message: 'Error al crear Registros',
                errors: err
            });
        }

        res.status( 201 ).json({
            ok: true,
            register: registerCreated
        });
    });
});


module.exports = app;