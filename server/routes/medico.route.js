
//creamos el manejador de rutas
const expreess = require('express');
const controlMedico = require('../controllers/medico.controller');
const router = expreess.Router();
//definimos las rutas 
router.get('/', controlMedico.getMedico);
router.get('/:id', controlMedico.getMedicoById);
router.post('/', controlMedico.createMedico);
router.put('/:id', controlMedico.editMedico);
router.delete('/:id', controlMedico.deleteMedico);
router.get('/medicos/:especialidad', controlMedico.getMedicoByEspecialidad)

//exportamos el modulo de rutas
module.exports = router;