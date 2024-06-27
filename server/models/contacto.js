const mongoose = require('mongoose');
const {Schema} = mongoose;
const ContactoSchema = new Schema({
    tipo: {type:String, required: true},
    valor: {type:String, required: true},
    
})
 module.exports = mongoose.models.Contacto || mongoose.model('Contacto', ContactoSchema);