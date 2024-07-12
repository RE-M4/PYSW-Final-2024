
const expreess = require('express');
const controlTurno = require('../controllers/turno.controller');
const router= expreess.Router();

router.get('/', controlTurno.getTurnoDesc);
router.post('/', controlTurno.createTurno);
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
router.put('/uppdate', controlTurno.updateTTurnos);
router.delete('/deletemany', controlTurno.deleteMany);
router.put('/vigencia', controlTurno.updateVigente);


module.exports = router;