//creamos el manejador de rutas
const expreess = require('express');
const administrativoCtrl = require('../controllers/admin.controller');
const router = expreess.Router();
//definimos las rutas 
router.get('/', administrativoCtrl.getAdmins); 
router.get('/fecha', administrativoCtrl.getAdminsByDate); 
router.post('/', administrativoCtrl.createAdmin); 
router.put('/:id', administrativoCtrl.updateAdmin);
router.delete('/:id', administrativoCtrl.deleteAdmin); 
router.get('/:dni', administrativoCtrl.getAdminByDni);

//exportamos el modulo de rutas
module.exports = router;