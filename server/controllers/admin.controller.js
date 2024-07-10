const Administrativo = require('../models/administrativo');

const administrativoCtrl = {}

//Obtener todos los administrativos
administrativoCtrl.getAdmins = async (req, res) => { 
    const admins = await Administrativo.find();
    res.status(200).json(admins);
}

//ordenar administrativo por fecha de mayor a menor
administrativoCtrl.getAdminsByDate = async (req, res) => {
    try{
        const admins = await Administrativo.find().sort({fecha_alta: -1});
        res.status(200).json(admins);
    }catch{
        res.status(400).json({
            'status': '0',
            'msg': 'Error al ordenar los administrativos.'
        })
    }
}

    //obtener administrativo por dni
administrativoCtrl.getAdminByDni = async (req, res) => {
    try{
        const admin = await Administrativo.findOne({ dni: req.params.dni });
        res.status(200).json(admin);
    }catch{
        res.status(400).json({
            'status': '0',
            'msg': 'Error al buscar el administrativo.'
        })
    }
}

//crear un administrativo
administrativoCtrl.createAdmin = async (req, res) => {
    const admin = new Administrativo(req.body);
    try {
        await admin.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Administrativo guardado.'
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '0',
            'msg': 'Error al guardar el administrativo.' + error
        })
    }
}

//editar un administrativo
administrativoCtrl.updateAdmin = async (req, res) => {
    var vadmin = new Administrativo(req.body);
    try {
        await Administrativo.updateOne({ _id: req.body._id }, vadmin);
        res.status(200).json({
            'status': '1',
            'msg': 'Administrativo actualizado.'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al actualizar el administrativo.' + error
        });
    }
}

//eliminar un administrativo
administrativoCtrl.deleteAdmin = async (req, res) => {
    try {
        await Administrativo.deleteOne({ _id: req.params.id });
        res.status(200).json({
            'status': '1',
            'msg': 'Administrativo eliminado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al eliminar el administrativo.' + error
        });
    }
}

module.exports = administrativoCtrl;