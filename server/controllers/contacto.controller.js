
const Contacto = require('../models/contacto');

const controlCont = {}

controlCont.getContacto = async (req, res) => { 
    var listaa = await Contacto.find();
    res.json(listaa);
}

controlCont.createContacto = async (req, res) => {
    var contac = new Contacto(req.body);
    try {
        await contac.save();
        res.json({
            'status': '1',
            'msg': 'Contacto guardado.'
        })
    } catch (error) { console.log(error); 
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Alta_Contacto.'
        })
    }
}

module.exports = controlCont;