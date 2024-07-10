const Historial = require('../models/historial');
const historialCtrl = {}

//Obtener todos los historiales o por filtro
historialCtrl.getHistoriales = async (req, res) => {
    const { medico, tratamiento, fecha_Inicio, estado } = req.query;
    const filter = {};

    if (medico) {
        filter.medico = medico;
    }
    if (tratamiento) {
        filter.tratamiento = new RegExp(tratamiento, 'i');
    }
    if (fecha_Inicio) {
        filter.fecha_Inicio = { $gte: new Date(fecha_Inicio) };
    }
    if (estado) {
        filter.estado = estado;
    }

    var historiales = await Historial.find(filter).populate('medico paciente');
    res.status(200).json(historiales);
}
// Obtener todos los historiales de un paciente
historialCtrl.getHistorialByPaciente = async (req, res) => {
    try {
        const historiales = await Historial.find({ paciente: req.params.pacienteId }).populate('medico paciente');
        res.status(200).json(historiales);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Al_buscar_Historial.'
        });
    }
};

// Obtener los historiales de los pacientes de un médico
historialCtrl.getHistorialByMedico = async (req, res) => {
    try {
        const historiales = await Historial.find({ medico: req.params.medicoId }).populate('medico paciente');
        res.status(200).json(historiales);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Al_buscar_Historial.'
        });
    }
};

//Obtener un historial segun el ID
historialCtrl.getHistorialById = async (req, res) => {
    try {
        var historial = await Historial.findById(req.params.id).populate('medico paciente');
        res.status(200).json(historial);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Al_buscar_Historial.'
        })
    }

}
//Crear un historial
historialCtrl.createHistorial = async (req, res) => {
    var historial = new Historial(req.body);
    try {
        await historial.save();
        res.json({
            'status': '1',
            'msg': 'Historial guardado.'
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Alta_Historial.'
        })
    }
}

/*
//bucar historial por medico
controlHistorial.getHistorialByMedico = async (req, res) => {
    try {
        var historiales = await Historial.find({medico: req.params.medico});
        if(!historiales) return res.status(404).json({msg: 'Historial no encontrado con ese Medico'});
        res.json(historiales);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en la petición getHistorialByMedico '});
    }
}

//busca historial por fecha_Inicio

controlHistorial.getHistorialByFecha_Inicio = async (req, res) => {
    try {
        var historiales = await Historial.find({fecha_Inicio: req.params.fecha_Inicio});
        if(!historiales) return res.status(404).json({msg: 'Historial no encontrado con esa fecha de inicio'});
        res.json(historiales);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en la petición getHistorialByFecha_Inicio'});
    }
}

//busca historial por fecha_Fin

controlHistorial.getHistorialByFecha_Fin = async (req, res) => {
    try {
        var historiales = await Historial.find({fecha_Fin: req.params.fecha_Fin});
        if(!historiales) return res.status(404).json({msg: 'Historial no encontrado con esa fecha de fin'});
        res.json(historiales);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en la petición getHistorialByFecha_Fin'});
    }
}

//busca historial por estado

controlHistorial.getHistorialByEstado = async (req, res) => {
    try {
        var historiales = await Historial.find({estado: req.params.estado});
        if(!historiales) return res.status(404).json({msg: 'Historial no encontrado con ese estado'});
        res.json(historiales);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en la petición getHistorialByEstado'});
    }
}

//busca historial por titulo

controlHistorial.getHistorialByTitulo = async (req, res) => {
    try {
        var historiales = await Historial.find({titulo: req.params.titulo});
        if(!historiales) return res.status(404).json({msg: 'Historial no encontrado con este título'});
        res.json(historiales);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en la petición getHistorialByTitulo'});
    }
}

//busca historial por tratamiento

controlHistorial.getHistorialByTratamiento = async (req, res) => {
    try {
        var historiales = await Historial.find({tratamiento: req.params.tratamiento});
        if(!historiales) return res.status(404).json({msg: 'Historial no encontrado con este tratamiento'});
        res.json(historiales);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en la petición getHistorialByTratamiento'});
    }
}


//busca historial por descripcion

controlHistorial.getHistorialByDescripcion = async (req, res) => {
    try {
        var historiales = await Historial.find({descripcion: req.params.descripcion});
        if(!historiales) return res.status(404).json({msg: 'Historial no encontrado con esta descripcion'});
        res.json(historiales);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en la petición getHistorialByDescripcion'});
    }
}

//borrar historial

controlHistorial.deleteHistorial = async (req, res) => {
    try {
        var hist = await Historial.findByIdAndDelete(req.params.id);
        if(!hist) return res.status(404).json({msg: 'Historial no encontrado'});
        res.json({msg: 'Historial eliminado'});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en la petición deleteHistorial'});
    }
}

//put historial

controlHistorial.updateHistorial = async (req, res) => {
    try {
        var hist = await Historial.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!hist) return res.status(404).json({msg: 'Historial no encontrado'});
        res.json(hist);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en la petición updateHistorial'});
    }
}
*/

module.exports = controlHistorial;
