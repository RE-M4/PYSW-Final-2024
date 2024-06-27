//creamos el manejador de rutas
const expreess = require('express');
const controlAdmin = require('../controllers/admin.controller');
const router = expreess.Router();
//definimos las rutas 
router.get('/', controlAdmin.getAdmin);
router.post('/', controlAdmin.createAdmin);
//router.get('/suma', controlll.getConverttt);
//router.get('/emaill/:email', controlll.getBuscaEmail);  
//router.get('/mOrigenn/:origen/mDestinoo/:destino', controlll.getBuscaM);  

//exportamos el modulo de rutas
module.exports = router;