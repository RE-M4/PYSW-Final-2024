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
            'msg': 'Paciente guardado.'
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


module.exports = controlPaciente;