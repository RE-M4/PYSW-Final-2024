const Novedades = require('../models/novedades');

const controlNovedades = {}

// Obtener todas las novedades
controlNovedades.getNovedades = async (req, res) => {
    var listaa = await Novedades.find();
    res.json(listaa);
}

// Obtener novedades por estado "pendiente" o "procesado" 
controlNovedades.getNovedadByEstado = async(req, res) =>{
    var listaa = await Novedades.find({estado: req.params.estado});
    res.json(listaa);
}

// Crear una nueva novedad
controlNovedades.createNovedades = async (req, res) => {
    var nove = new Novedades(req.body);
    try {
        await nove.save();
        res.json({
            'status': '1',
            'msg': 'Novedades guardado.'
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Alta_Novedades.'
        })
    }
}

// Obtener novedad por ID
controlNovedades.getNovedadById = async (req, res) => {
    try {
        let novedad = await Novedades.findById(req.params.id);
        res.json(novedad);
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Al_buscar_novedad.'
        })
    }
}

// Editar una novedad por ID
controlNovedades.editNovedad = async (req, res) => {
    let novedad = new Novedades(req.body);
    try {
        await Novedades.updateOne({_id: req.body._id}, novedad)
        res.json({
            'status': '1',
            'msg': 'Novedad editada.'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Al_editar_novedad.'
        })
    }
}

// Eliminar una novedad por ID
controlNovedades.deleteNovedad = async (req, res) =>{
    try {
        await Novedades.deleteOne({_id: req.params.id});
        res.json({
            'status': '1',
            'msg': 'Novedad eliminada.'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Al_eliminar_novedad.'
        });
    }

}


    //cambiar estado de la novedad
    controlNovedades.changeEstado = async (req, res) =>{
        try {
            await Novedades.updateOne ({_id: req.body._id}, {estado: 'procesado'});
            res.json({
                'status': '1',
                'msg': 'Estado cambiado.'
            });
        } catch (error) {
            res.status(400).json({
                'status': '0',
                'msg': 'Error_Al_cambiar_estado.'
            });
        }
    }

    //filtrar novedades por tipo
    controlNovedades.getNovedadByTipo = async(req, res) =>{
        try{
            var listaa = await Novedades.find({tipo: req.params.tipo});
            res.json(listaa);

        }catch{
            res.status(400).json({
                'status': '0',
                'msg': 'Error_Al_filtrar_por_tipo.'
        });
    }

}

module.exports = controlNovedades;