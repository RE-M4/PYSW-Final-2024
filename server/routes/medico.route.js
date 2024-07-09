
//creamos el manejador de rutas
const expreess = require('express');
const controlMedico = require('../controllers/medico.controller');
const router = expreess.Router();
//definimos las rutas 
router.get('/', controlMedico.getMedico);
//router.post('/', controlMedico.createMedico);
//router.get('/id/:id', controlMedico.getMedicoById);
//router.get('/dni/:dni', controlMedico.getMedicoByDni);
//router.get('/matricula/:matricula', controlMedico.getMedicoByMatricula);
//router.get('/especialidad/:especialidad', controlMedico.getMedicoByEspecialidad);  
//router.get('/apellido/:apellido/especialidad/:especialidad', controlMedico.getMedicoByApellidoEspecialidad);  
//router.put('/id/:id',controlMedico.updateMedico );
//router.delete('/id/:id',controlMedico.deleteMedico );


//exportamos el modulo de rutas

module.exports = router;