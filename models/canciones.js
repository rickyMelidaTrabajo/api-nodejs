const mongoose = require('mongoose');

const schema = mongoose.Schema;

let cancionesSchema = schema({
    nombre: String,
    artista: String
});

module.exports = mongoose.model('Canciones', cancionesSchema);