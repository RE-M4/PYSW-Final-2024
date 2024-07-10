//creamos el manejador de rutas
const expreess = require('express');
const controlPaciente = require('../controllers/paciente.controller');
const router = expreess.Router();
//definimos las rutas 
<<<<<<< HEAD
//router.get('/', controlPaciente.getPacienteByDateMayoresAscendente);
//router.post('/', controlPaciente.createPaciente);
//router.get('/id/:id', controlPaciente.getPacienteById);
//router.get('/dni/:dni', controlPaciente.getPacienteByDni);
//router.get('/apellido/:apellido', controlPaciente.getPacienteByApellido);
//router.get('/domicilio/:domicilio', controlPaciente.getPacienteByDomicilio);
//router.put('/id/:id', controlPaciente.updatePaciente);
//router.delete('/id/:id', controlPaciente.deletePaciente);
//router.get('/apellido/:apellido/domicilio/:domicilio', controlPaciente.getPacienteByApellidoAndDomicilio);

=======
router.get('/', controlPaciente.getPaciente);
router.post('/', controlPaciente.createPaciente);
router.get('/id/:id', controlPaciente.getPacienteById);
router.get('/dni/:dni', controlPaciente.getPacienteByDni);
router.get('/apellido/:apellido', controlPaciente.getPacienteByApellido);
router.get('/domicilio/:domicilio', controlPaciente.getPacienteByDomicilio);
router.put('/id/:id', controlPaciente.updatePaciente);
router.delete('/id/:id', controlPaciente.deletePaciente);

//router.get('/emaill/:email', controlll.getBuscaEmail);  
//router.get('/mOrigenn/:origen/mDestinoo/:destino', controlll.getBuscaM);  
>>>>>>> 75fb01ca67f8c826d67ee5c422610461ea9874f7

//exportamos el modulo de rutas
module.exports = router;