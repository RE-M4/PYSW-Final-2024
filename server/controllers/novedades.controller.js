const Novedades = require('../models/novedades');

const controlNovedades = {}

controlNovedades.getNovedades = async (req, res) => { 
    var listaa = await Novedades.find();
    res.json(listaa);
}

controlNovedades.createNovedades = async (req, res) => {
    var nove = new Novedades(req.body);
    try {
        await nove.save();
        res.json({
            'status': '1',
            'msg': 'Novedades guardado.'
        })
    } catch (error) { console.log(error); 
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Alta_Novedades.'
        })
    }
}

module.exports = controlNovedades;