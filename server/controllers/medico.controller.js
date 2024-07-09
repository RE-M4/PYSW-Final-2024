const Medico = require('../models/medico');

const controlMedico = {}

controlMedico.getMedico = async (req, res) => { 
    var listaa = await Medico.find();
    res.json(listaa);
}

// controlMedico.createMedico = async (req, res) => {
//     var medi = new Medico(req.body);
//     try {
//         await medi.save();
//         res.json({
//             'status': '1',
//             'msg': 'Medico guardado.'
//         })
//     } catch (error) { console.log(error); 
//         res.status(400).json({
//             'status': '0',
//             'msg': 'Error_Alta_Medico.'
//         })
//     }
// }


// controlMedico.getMedicoByDni = async (req, res) => {
//     try {
//         var medico = await Medico.findOne({dni: req.params.dni});
//         if(!medico) return res.status(404).json({msg: 'No exite Medico con ese DNI, pruebe con otro DNI'});
//         res.json(medico);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({msg: 'Error buscar medico por DNI'});
//     }
// }

// // busca por id

// controlMedico.getMedicoById = async (req, res) => {
//     try {
//         var medico = await Medico.findById(req.params.id);
//         if(!medico) return res.status(404).json({msg: 'No exite Medico con ese ID'});
//         res.json(medico);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({msg: 'Error buscar medico por ID'});
//     }
// }


// //busca por matricula

// controlMedico.getMedicoByMatricula = async (req, res) => {
//     try {
//         var medico = await Medico.findOne({matricula: req.params.matricula});
//         if(!medico) return res.status(404).json({msg: 'No exite Medico con esa matricula, pruebe con otra matricula'});
//         res.json(medico);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({msg: 'Error buscar medico por matricula'});
//     }
// }

// //busca por especialidad

// controlMedico.getMedicoByEspecialidad = async (req, res) => {
//     try {
//         var medicos = await Medico.find({especialidad: req.params.especialidad});
//         if(medicos.length === 0) return res.status(404).json({msg: 'No hay Medicos con esa especialidad'});
//         res.json(medicos);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({msg: 'Error buscar medicos por especialidad'});
//     }
// }

// //busca por apellido y especialidad

// controlMedico.getMedicoByApellidoEspecialidad = async (req, res) => {
//     try {
//         var medicos = await Medico.find({apellido: req.params.apellido, especialidad: req.params.especialidad});
//         if(medicos.length === 0) return res.status(404).json({msg: 'No hay Medicos con esa especialidad y apellido'});
//         res.json(medicos);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({msg: 'Error buscar medicos por apellido y especialidad'});
//     }
// }


// //update medico
// controlMedico.updateMedico = async (req, res) => {
//     try {
//         var medico = await Medico.findByIdAndUpdate(req.params.id, req.body, {new: true});
//         if(!medico) return res.status(404).json({msg: 'No exite Medico con ese ID'});
//         res.json(medico);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({msg: 'Error actualizar medico'});
//     }
// }


// //elimina medico
// controlMedico.deleteMedico = async (req, res) => {
//     try {
//         var medico = await Medico.findByIdAndDelete(req.params.id);
//         if(!medico) return res.status(404).json({msg: 'No exite Medico con ese ID'});
//         res.json({msg: 'Medico eliminado correctamente'});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({msg: 'Error eliminar medico'});
//     }
// }







module.exports = controlMedico;