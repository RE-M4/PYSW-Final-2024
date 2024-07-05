const mongoose = require('mongoose');
const {Schema} = mongoose;

const AdministrativoSchema = new Schema({
    apellido: {type:String, required: true},
    nombre: {type:String, required: true},
    dni: {type:Number, required: true},
    password : {type:String, required:true},
    activo : {type:Boolean, required: true},
    fecha_alta : {type:Date, required: true},
    perfil : {type:String, enum:['it','decano','doctor'], required: true},
})

 module.exports = mongoose.models.Administrativo || mongoose.model('Administrativo', AdministrativoSchema);