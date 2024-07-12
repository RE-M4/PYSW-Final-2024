const Paciente = require('../models/paciente');

const controlPaciente = {}

controlPaciente.getPaciente = async (req, res) => { 
    var listaa = await Paciente.find();
    res.json(listaa);
}

controlPaciente.createPaciente = async (req, res) => {
    var paci = new Paciente(req.body);
    try {
        await paci.save();
        res.json({
            'status': '1',
            'msg': 'Paciente guardado.',
            paci
        })
    } catch (error) { console.log(error); 
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Alta_Paciente.'
        })
    }
}
controlPaciente.getPacienteById = async (req, res) => {
  const paciente = await Paciente.findById(req.params.id);
  res.json(paciente);
};
controlPaciente.editPaciente = async (req, res) => {
  const vpaciente = new Paciente(req.body);
  try {
    await Paciente.updateOne({ _id: req.body._id }, vpaciente);
    res.json({
      status: "1",
      msg: "Paciente Actualizado",
    });
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error procesando la operacion",
    });
  }
};
controlPaciente.deletePaciente = async (req, res) => {
  try {
    await Paciente.deleteOne({ _id: req.params.id });
    res.json({
      status: "1",
      msg: "Paciente removed",
    });
  } catch (error) {
    res.status(400).json({
      status: "0",
      msg: "Error procesando la operacion",
    });
  }
};
// Obtener medico por DNI
controlPaciente.getPacienteByDni = async (req, res) =>{
  try {
      let paciente = await Paciente.findOne({dni: req.params.dni});
      res.status(200).json(paciente);
  } catch (error) { console.log(error);
      res.status(400).json({
          'status': '0',
          'msg': 'Error_Al_buscar_paciente.'
      })
  }
}

controlPaciente.login = async (req, res) =>{
  const criteria = {
    dni: req.body.dni,
    password: req.body.password
  }
  
  try {
    //el método findOne retorna un objeto que cumpla con los criterios de busqueda
    const paciente = await Paciente.findOne(criteria);
      if (!paciente) {
      res.json({
        status: 0,
        msg: "not found"
      })
      } else {
      res.json({
        status: 1,
        msg: "success",
        dni: paciente.dni, //retorno información útil para el frontend
        id: paciente.id //retorno información útil para el frontend
      })
      }
    } catch (error) {
      res.json({
      status: 0,
      msg: 'error'
    })
    }
    
}

module.exports = controlPaciente;