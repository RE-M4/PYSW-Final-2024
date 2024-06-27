const mongoose = require('mongoose');
const Contacto = require('./contacto');
const {Schema} = mongoose;

const AdministrativoSchema = new Schema({
    apellido: {type:String, required: true},
    nombre: {type:String, required: true},
    dni: {type:Number, required: true},
    password : {type:String, required:true},
    activo : {type:Boolean, required: true},
    fecha_alta : {type:Date, required: true},
    perfil : {type:String, required: true},
    contactos: {type: Schema.Types.Array, ref: Contacto, required: true}
    
    
   
})
 module.exports = mongoose.models.Administrativo || mongoose.model('Administrativo', AdministrativoSchema);