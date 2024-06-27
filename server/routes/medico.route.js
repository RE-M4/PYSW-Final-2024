
//creamos el manejador de rutas
const expreess = require('express');
const controlMedico = require('../controllers/medico.controller');
const router = expreess.Router();
//definimos las rutas 
router.get('/', controlMedico.getMedico);
router.post('/', controlMedico.createMedico);
//router.get('/suma', controlll.getConverttt);
//router.get('/emaill/:email', controlll.getBuscaEmail);  
//router.get('/mOrigenn/:origen/mDestinoo/:destino', controlll.getBuscaM);  

//exportamos el modulo de rutas
module.exports = router;