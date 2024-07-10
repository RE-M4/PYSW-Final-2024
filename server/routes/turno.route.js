//creamos el manejador de rutas
const expreess = require('express');
const controlTurno = require('../controllers/turno.controller');
const router= expreess.Router();
//definimos las rutas 
router.get('/', controlTurno.getTurnoDesc);
router.post('/', controlTurno.createTurno);
<<<<<<< HEAD
router.get('/id/:id', controlTurno.getTurnoById);
router.get('/fechaturno/:fechaturno', controlTurno.getTurnoByDateMayoresDescendente);
router.get('/estado/:estado', controlTurno.getTurnoByState);
router.get('/id_medico/:medico', controlTurno.getTurnoByMedico);
router.get('/id_paciente/:paciente', controlTurno.getTurnoByPaciente);
router.get('/sala/:sala', controlTurno.getTurnoBySala);
router.get('/pagado/:pagado', controlTurno.getTurnoByPagado);
router.delete('/id/:id', controlTurno.deleteTurno);
router.get('/medico/:medico/paciente/:paciente', controlTurno.getTurnoByMedicoAndPaciente);
router.get('/enfermedad/:enfermedad', controlTurno.getTurnoByEnfermedad);
router.get('/tipoPago/:tipoPago', controlTurno.getTurnoByTipoPago);
router.put('/id/:id', controlTurno.updateTurno);
router.get('/all', controlTurno.getAllTurnos);
router.get('/last', controlTurno.getLastTurno);
=======
router.get('/id_medico/:medico', controlTurno.getTurnoByMedico);

//router.get('/suma', controlll.getConverttt);
//router.get('/emaill/:email', controlll.getBuscaEmail);  
//router.get('/mOrigenn/:origen/mDestinoo/:destino', controlll.getBuscaM);  
>>>>>>> 75fb01ca67f8c826d67ee5c422610461ea9874f7

//exportamos el modulo de rutas
module.exports = router;