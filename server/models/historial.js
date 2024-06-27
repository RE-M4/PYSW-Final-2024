const mongoose = require('mongoose');
const {Schema} = mongoose;
const Medico = require ('./medico');
const HistorialSchema = new Schema({
    titulo: {type:String, required: true},
    descripcion: {type:String, required: true},
    tratamiento : {type:String, required:true},  
    medico: {type: Schema.Types.ObjectId, ref: Medico, required: true},
    fecha_Inicio : {type:Date, required: true},
    fecha_Fin : {type:Date, required: true},
    estado: {type:String, required: true},
  
    
})
 module.exports = mongoose.models.Historial || mongoose.model('Historial', HistorialSchema);