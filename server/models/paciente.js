const mongoose = require('mongoose');
const {Schema} = mongoose;
const Contacto = require ('./contacto');
const Historial = require ('./historial');
const PacienteSchema = new Schema({
    apellido: {type:String, required: true},
    nombre: {type:String, required: true},
    dni : {type:Number, required:true},
    domicilio : {type:String, required: true},
    contactos: {type: Schema.Types.Array, ref: Contacto, required: true},
    historia: {type: Schema.Types.Array, ref: Historial, required: true}
   
    
})
 module.exports = mongoose.models.Paciente || mongoose.model('Paciente', PacienteSchema);