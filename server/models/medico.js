const mongoose = require('mongoose');
const {Schema} = mongoose;
const Contacto = require ('./contacto');
const MedicoSchema = new Schema({
    apellido: {type:String, required: true},
    nombre: {type:String, required: true},
    dni: {type:Number, required: true},
    matricula : {type:String, required:true},
    domicilio : {type:String, required: true},
    especialidad : {type:String, required: true},
    contactos: {type: Schema.Types.Array, ref: Contacto, required: true}
    
    
   
})
 module.exports = mongoose.models.Medico || mongoose.model('Medico', MedicoSchema);