//creamos el manejador de rutas
const expreess = require('express');
const controlPaciente = require('../controllers/paciente.controller');
const router = expreess.Router();
//definimos las rutas 
router.get('/', controlPaciente.getPaciente);
router.get('/buscar/:dni', controlPaciente.getPacienteByDni);
router.get('/:id', controlPaciente.getPacienteById);
router.post('/', controlPaciente.createPaciente);
router.put('/:id', controlPaciente.editPaciente);
router.delete('/:id', controlPaciente.deletePaciente);

router.post('/login', controlPaciente.login);
//router.get('/suma', controlll.getConverttt);
//router.get('/emaill/:email', controlll.getBuscaEmail);  
//router.get('/mOrigenn/:origen/mDestinoo/:destino', controlll.getBuscaM);  

//exportamos el modulo de rutas
module.exports = router;