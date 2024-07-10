//creamos el manejador de rutas
const expreess = require('express');
const controlNovedades = require('../controllers/novedades.controller');
const router = expreess.Router();
//definimos las rutas 
router.get('/', controlNovedades.getNovedades);
router.post('/', controlNovedades.createNovedades);
//router.get('/suma', controlll.getConverttt);
//router.get('/emaill/:email', controlll.getBuscaEmail);  
//router.get('/mOrigenn/:origen/mDestinoo/:destino', controlll.getBuscaM);  

//exportamos el modulo de rutas
module.exports = router;