//creamos el manejador de rutas
const expreess = require('express');
const controlCont = require('../controllers/contacto.controller');
const router = expreess.Router();
//definimos las rutas 
router.get('/', controlCont.getContacto);
router.post('/', controlCont.createContacto);
//router.get('/suma', controlll.getConverttt);
//router.get('/emaill/:email', controlll.getBuscaEmail);  
//router.get('/mOrigenn/:origen/mDestinoo/:destino', controlll.getBuscaM);  

//exportamos el modulo de rutas
module.exports = router;