const mongoose = require('mongoose');
const {Schema} = mongoose;
const Medico = require ('./medico');
const Paciente = require ('./paciente');
const TurnoSchema = new Schema({
    fechaturno: {type:Date, required: true},
    horaturno: {type:Date, required: true},
    enfermedad:{type:String, required: true},
    tipoPago:{type:String, required: true}, 
    sala : {type:String, required:true},
    pagado : {type:Boolean, required: true},
    estado: {type:String, required: true},
    paciente: {type: Schema.Types.ObjectId, ref: Paciente, required: true},
    medico: {type: Schema.Types.ObjectId, ref: Medico, required: true}
      
})
 module.exports = mongoose.models.Turno || mongoose.model('Turno', TurnoSchema);