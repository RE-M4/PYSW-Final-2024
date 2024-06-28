const Turno = require('../models/turno');

const controlTurno = {}

controlTurno.getTurno = async (req, res) => { 
    var listaa = await Turno.find();
    res.json(listaa);
}

controlTurno.createTurno = async (req, res) => {
    var tturno = new Turno(req.body);
    try {
        await tturno.save();
        res.json({
            'status': '1',
            'msg': 'TURNO guardado.'
        })
    } catch (error) { console.log(error); 
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Alta_TURNO.'
        })
    }
}


// busca por id

controlTurno.getTurnoById = async (req, res) => {
    try {
        var turno = await Turno.findById(req.params.id);
        if(!turno) return res.status(404).json({msg: 'No exite turno con ese ID'});
        res.json(turno);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error buscar turno por ID'});
    }
}

//busca por fecha

controlTurno.getTurnoByDate = async (req, res) => {
    try {
        var turnos = await Turno.find({fechaturno: req.params.fechaturno});
        if(!turnos) return res.status(404).json({msg: 'No hay turnos para esa fecha'});
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error buscar turnos por fecha'});
    }
}

//busca por estado

controlTurno.getTurnoByState = async (req, res) => {
    try {
        var turnos = await Turno.find({estado: req.params.estado});
        if(!turnos) return res.status(404).json({msg: 'No hay turnos con ese estado'});
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error buscar turnos por estado'});
    }
}

//busca por _id del Medico

controlTurno.getTurnoByMedico = async (req, res) => {
    try {
        var turnos = await Turno.find({medico: req.params.medico});
        if(!turnos) return res.status(404).json({msg: 'No hay turnos para este medico'});
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error buscar turnos por medico'});
    }
}












module.exports = controlTurno;