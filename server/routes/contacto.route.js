//creamos el manejador de rutas
const expreess = require('express');
const controlCont = require('../controllers/contacto.controller');
const router = expreess.Router();
//definimos las rutas 
router.get('/', controlCont.getContacto);
router.post('/', controlCont.createContacto);
//router.get('/id/:id', controlCont.getContactoById);


//exportamos el modulo de rutas
module.exports = router;