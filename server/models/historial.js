const mongoose = require('mongoose');
const {Schema} = mongoose;
const Medico = require ('./medico');
const Paciente = require ('./paciente');
const HistorialSchema = new Schema({
    titulo: {type:String, required: true},
    descripcion: {type:String, required: true},
    tratamiento : {type:String, required:true},  
    medico: {type: Schema.Types.ObjectId, ref: Medico, required: true},
    paciente: { type: Schema.Types.ObjectId, ref: Paciente, required: true },
    fecha_Inicio : {type:Date, required: true},
    fecha_Fin : {type:Date, required: true},
    estado: { type: String, enum: ['vigente', 'finalizado'], required: true },
    fechaingreso: { type: Date, required: false}
})
 module.exports = mongoose.models.Historial || mongoose.model('Historiales', HistorialSchema);