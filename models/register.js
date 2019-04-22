var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var registerSchema = new Schema({
    name: { type: String, required: [true, 'El campo de nombre es obligatorio'] },
    street: { type: String, required: [true, 'El campo de calle es obligatorio'] },
    colony: { type: String, required: false },
    reference: { type: String, required: [true, 'El campo de referencia es obligatorio'] },
    phone: { type: String, required: false },
    nextVisit: { type: String, required: [true, 'El campo de proxima visita es obligatoria'] }
});

module.exports = mongoose.model( 'Register', registerSchema );