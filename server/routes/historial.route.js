//creamos el manejador de rutas
const expreess = require('express');
const controlHistorial = require('../controllers/historial.controller');
const router= expreess.Router();
//definimos las rutas 
router.get('/', controlHistorial.getHistorial);
router.post('/', controlHistorial.createHistorial);
//router.get('/suma', controlll.getConverttt);
//router.get('/emaill/:email', controlll.getBuscaEmail);  
//router.get('/mOrigenn/:origen/mDestinoo/:destino', controlll.getBuscaM);  

//exportamos el modulo de rutas
module.exports = router;