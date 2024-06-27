const Administrativo = require('../models/administrativo');

const controlAdmin = {}

controlAdmin.getAdmin = async (req, res) => { 
    var listaa = await Administrativo.find();
    res.json(listaa);
}

controlAdmin.createAdmin = async (req, res) => {
    var addmin = new Administrativo(req.body);
    try {
        await addmin.save();
        res.json({
            'status': '1',
            'msg': 'Administrativo guardado.'
        })
    } catch (error) { console.log(error); 
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Alta_Administrativo.'
        })
    }
}

module.exports = controlAdmin;