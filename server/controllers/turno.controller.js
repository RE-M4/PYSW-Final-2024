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

module.exports = controlTurno;