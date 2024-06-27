const Medico = require('../models/medico');

const controlMedico = {}

controlMedico.getMedico = async (req, res) => { 
    var listaa = await Medico.find();
    res.json(listaa);
}

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

module.exports = controlMedico;