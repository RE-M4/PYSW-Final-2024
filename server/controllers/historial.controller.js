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

//Modificar un historial
historialCtrl.updateHistorial = async (req, res) => {
    var vhistorial = new Historial(req.body);
    try {
        await Historial.updateOne({ _id: req.body._id }, vhistorial);
        res.json({
            'status': '1',
            'msg': 'Historial actualizado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Al_editar_Historial.'
        });
    }
}

//Eliminar un historial
historialCtrl.deleteHistorial = async (req, res) => {
    try {
        await Historial.deleteOne({ _id: req.params.id });
        res.json({
            'status': '1',
            'msg': 'Historial eliminado.'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Al_eliminar_Historial.'
        });
    }
}
module.exports = historialCtrl;