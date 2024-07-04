//creamos el manejador de rutas
const express = require('express');
const historialCtrl = require('../controllers/historial.controller');
const router= express.Router();
//definimos las rutas 
router.get('/', historialCtrl.getHistoriales);
router.get('/:id', historialCtrl.getHistorialById);
router.post('/', historialCtrl.createHistorial);
router.put('/:id', historialCtrl.updateHistorial);
router.delete('/:id', historialCtrl.deleteHistorial);


//exportamos el modulo de rutas
module.exports = router;