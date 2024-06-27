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

module.exports = controlHistorial;