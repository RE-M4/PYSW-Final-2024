const mongoose = require('mongoose');
const {Schema} = mongoose;
const Administrativo = require ('./administrativo');
const NovedadesSchema = new Schema({
    titulo: {type:String, required: true},
    descripcion: {type:String, required: true},
    fecha_ini : {type:Date, required: true},
    estado : {type:String, required: true},
    administra: {type: Schema.Types.ObjectId, ref: Administrativo, required: true}
    
    
   
})
 module.exports = mongoose.models.Novedades || mongoose.model('Novedades', NovedadesSchema);