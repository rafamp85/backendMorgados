
const express = require('express');
const app = express();
const push = require( '../modules/push' );


// NOTIFICACIONES
// ==================================
// Almacena una suscripción
// ==================================
app.post('/subscribe', (req, res) => {

    const subscription = req.body;

    push.addSubscription( subscription );

    res.json( 'subscribe' );

});


// ==================================
// Obtener la llave publico de la suscripción
// ==================================
app.get('/', (req, res, next) => {

    const key = push.getKey();

    res.send( key );

});


// ==================================
// Envia las notificaciones PUSH
// ==================================
app.post('/push', (req, res) => {

    const post = {
        name: req.body.name,
        street: req.body.street,
        phone: req.body.phone
    };

    push.sendPush( post );
    
    res.json( post );


});


module.exports = app;