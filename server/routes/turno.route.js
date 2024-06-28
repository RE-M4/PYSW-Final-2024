//creamos el manejador de rutas
const expreess = require('express');
const controlTurno = require('../controllers/turno.controller');
const router= expreess.Router();
//definimos las rutas 
router.get('/', controlTurno.getTurno);
router.post('/', controlTurno.createTurno);
router.get('/id_medico/:medico', controlTurno.getTurnoByMedico);

//router.get('/suma', controlll.getConverttt);
//router.get('/emaill/:email', controlll.getBuscaEmail);  
//router.get('/mOrigenn/:origen/mDestinoo/:destino', controlll.getBuscaM);  

//exportamos el modulo de rutas
module.exports = router;