const Medico = require('../models/medico');

const controlMedico = {}

// Obtener todos los medicos
controlMedico.getMedico = async (req, res) => { 
    var listaa = await Medico.find();
    res.json(listaa);
}

// Obtener medico por DNI
controlMedico.getMedicoByDni = async (req, res) =>{
    try {
        let medico = await Medico.findOne({dni: req.params.dni});
        res.status(200).json(medico);
    } catch (error) { console.log(error);
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Al_buscar_medico.'
        })
    }
}

// Obtener medicos por especialidad
controlMedico.getMedicoByEspecialidad = async (req, res) =>{
    try {
        const especialidad = req.params.especialidad.toLowerCase();
        let medicos = await Medico.find({
            especialidad: { $regex: especialidad, $options: 'i' }
        });
        res.json(medicos);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Al_buscar_medicos.'
        });
    }
}

// Obtener medicos por nombre o apellido
controlMedico.getMedicoByNombreApellido = async (req, res) =>{
    try {
        const busqueda = req.params.busqueda;
        let medicos = await Medico.find({
            $or: [
                { nombre: { $regex: busqueda, $options: 'i' } },
                { apellido: { $regex: busqueda, $options: 'i' } }
            ]
        });
        res.json(medicos);
    } catch (error) { 
        console.log(error);
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Al_buscar_medicos.'
        });
    }
}

// Crear un nuevo perfil de medico
controlMedico.createMedico = async (req, res) => {
    var medi = new Medico(req.body);
    try {
        await medi.save();
        res.json({
            'status': '1',
            'msg': 'Medico guardado.'
        })
    } catch (error) { console.log(error); 
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Alta_Medico.'
        })
    }
}

// Obtener medico por id
controlMedico.getMedicoById = async(req, res) =>{
    try {
        let medico = await Medico.findById(req.params.id);
        res.json(medico);
    } catch (error) { console.log(error);
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Al_buscar_medico.'
        })
    }
}

// Editar un medico por id
controlMedico.editMedico = async(req, res) => {
    let medico = new Medico(req.body);
    try{
        await Medico.updateOne({_id: req.body._id}, medico);
        res.json({
            'status': '1',
            'msg': 'Medico editado.'
        })
    } catch(error){
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Al_editar_medico.'
        })
    }
}

// Eliminar un medico por id
controlMedico.deleteMedico = async(req, res) => {
    try{
        await Medico.deleteOne({_id: req.params.id});
        res.json({
            'status': '1',
            'msg': 'Medico eliminado.'
        })
    } catch(error){
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Al_eliminar_medico.'
        })
    }
}

module.exports = controlMedico;