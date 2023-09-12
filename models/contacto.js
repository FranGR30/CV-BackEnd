const mongoose = require("mongoose");

const contactoSchema = mongoose.Schema({
    nombreYApellido:String,
    email:String,
    telefono:Number,
    mensaje: String,
    fechaContacto:Date,
    leido: Boolean
})

module.exports = mongoose.model("Contacto",contactoSchema);