const Paciente = require('../models/paciente');

const controlPaciente = {}

controlPaciente.getPaciente = async (req, res) => { 
    var listaa = await Paciente.find();
    res.json(listaa);
}

controlPaciente.createPaciente = async (req, res) => {
    var paci = new Paciente(req.body);
    try {
        await paci.save();
        res.json({
            'status': '1',
            'msg': 'Paciente guardado.'
        })
    } catch (error) { console.log(error); 
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Alta_Paciente.'
        })
    }
}

//buscar por _id

controlPaciente.getPacienteById = async (req, res) => {
    try {
        var paciente = await Paciente.findById(req.params.id);
        if(!paciente) return res.status(404).json({msg: 'Paciente no encontrado'});
        res.json(paciente);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en la petición'});
    }
}


//buscar por dni

controlPaciente.getPacienteByDni = async (req, res) => {
    try {
        var paciente = await Paciente.findOne({dni: req.params.dni});
        if(!paciente) return res.status(404).json({msg: 'Paciente no encontrado'});
        res.json(paciente);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en la petición'});
    }
}


//busca paciente por apellido

controlPaciente.getPacienteByApellido = async (req, res) => {
    try {
        var pacientes = await Paciente.find({apellido: req.params.apellido});
        if(!pacientes) return res.status(404).json({msg: 'Pacientes no encontrados'});
        res.json(pacientes);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en la petición'});
    }
}


// busca paciente por domicilio

controlPaciente.getPacienteByDomicilio = async (req, res) => {
    try {
        var pacientes = await Paciente.find({domicilio: req.params.domicilio});
        if(!pacientes) return res.status(404).json({msg: 'Pacientes no encontrados'});
        res.json(pacientes);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en la petición'});
    }
}

// update paciente
controlPaciente.updatePaciente = async (req, res) => {
    try {
        var paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!paciente) return res.status(404).json({msg: 'Paciente no encontrado'});
        res.json(paciente);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en la petición'});
    }
}


// delete paciente
controlPaciente.deletePaciente = async (req, res) => {
    try {
        var paciente = await Paciente.findByIdAndDelete(req.params.id);
        if(!paciente) return res.status(404).json({msg: 'Paciente no encontrado'});
        res.json({msg: 'Paciente eliminado'});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en la petición'});
    }
}



module.exports = controlPaciente;