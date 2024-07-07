//creamos el manejador de rutas
const express = require('express');
const historialCtrl = require('../controllers/historial.controller');
const router= express.Router();
//definimos las rutas 
router.get('/', historialCtrl.getHistoriales); //Obtener todos los historiales o por filtro
router.get('/:id', historialCtrl.getHistorialById); //Obtener un historial por su ID
router.post('/', historialCtrl.createHistorial); //crear un historial
router.put('/:id', historialCtrl.updateHistorial); //actualizar un historial
router.delete('/:id', historialCtrl.deleteHistorial); //borrar un historial
router.get('/paciente/:pacienteId', historialCtrl.getHistorialByPaciente); // Obtener historiales por paciente
router.get('/medico/:medicoId', historialCtrl.getHistorialByMedico); // Obtener historiales por médico
//exportamos el modulo de rutas
module.exports = router;