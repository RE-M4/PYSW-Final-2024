const Historial = require('../models/historial');

const controlHistorial = {}

controlHistorial.getHistorial = async (req, res) => { 
    var listaa = await Historial.find();
    res.json(listaa);
}

controlHistorial.createHistorial = async (req, res) => {
    var hist = new Historial(req.body);
    try {
        await hist.save();
        res.json({
            'status': '1',
            'msg': 'HISTORIAL guardado.'
        })
    } catch (error) { console.log(error); 
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Alta_HISTORIAL.'
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