//creamos el manejador de rutas
const expreess = require('express');
const controlHistorial = require('../controllers/historial.controller');
const router= expreess.Router();

//definimos las rutas 
router.get('/', controlHistorial.getHistorial);
router.post('/', controlHistorial.createHistorial);
//router.get('/id_medico/:medico', controlHistorial.getHistorialByMedico);
//router.get('/fecha_Inicio/:fecha_Inicio', controlHistorial.getHistorialByFecha_Inicio);
//router.get('/fecha_Fin/:fecha_Fin', controlHistorial.getHistorialByFecha_Fin);
//router.get('/estado/:estado', controlHistorial.getHistorialByEstado);
//router.get('/titulo/:titulo', controlHistorial.getHistorialByTitulo);
//router.get('/tratamiento/:tratamiento', controlHistorial.getHistorialByTratamiento);
//router.get('/descripcion/:descripcion', controlHistorial.getHistorialByDescripcion);
//router.put('/id/:id',controlHistorial.updateHistorial );
//router.delete('/id/:id',controlHistorial.deleteHistorial );

//exportamos el modulo de rutas
module.exports = router;