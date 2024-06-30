//creamos el manejador de rutas
const expreess = require('express');
const controlNovedades = require('../controllers/novedades.controller');
const router = expreess.Router();
//definimos las rutas 
router.get('/', controlNovedades.getNovedades);
router.get('/:id', controlNovedades.getNovedadById);
router.post('/', controlNovedades.createNovedades);
router.put('/:id', controlNovedades.editNovedad);
router.delete('/:id', controlNovedades.deleteNovedad);
router.get('/estado/:estado', controlNovedades.getNovedadByEstado)

//exportamos el modulo de rutas
module.exports = router;