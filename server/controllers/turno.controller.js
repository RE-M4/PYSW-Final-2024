const Turno = require('../models/turno');

const controlTurno = {}


controlTurno.createTurno = async (req, res) => {
    var tturno = new Turno(req.body);
    try {
        await tturno.save();
        res.json({
            'status': '1',
            'msg': 'TURNO guardado.'
        })
    } catch (error) { console.log(error); 
        res.status(400).json({
            'status': '0',
            'msg': 'Error_Alta_TURNO.'
        })
    }
}


// busca por id

controlTurno.getTurnoById = async (req, res) => {
    try {
        var turno = await Turno.findById(req.params.id);
        if(!turno) return res.status(404).json({msg: 'No exite turno con ese ID'});
        res.json(turno);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error buscar turno por ID'});
    }
}



controlTurno.getTurnoByDateMayoresDescendente = async (req, res) => {
    try {
        var turnos = await Turno.find({fechaturno: {$gte: req.params.fechaturno}}).sort({fechaturno: -1});
        if(!turnos) return res.status(404).json({msg: 'No hay turnos mayores a esa fecha de ingreso'});
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error buscar turnos mayores a fecha de ingreso en orden ascendente'});
    }
}


//busca por estado
controlTurno.getTurnoByState = async (req, res) => {
    try {
        var turnos = await Turno.find({estado: req.params.estado}).sort({ fechaturno: -1 });
        if(!turnos) return res.status(404).json({msg: 'No hay turnos con ese estado'});
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error buscar turnos por estado'});
    }
}

//busca por _id del Medico
controlTurno.getTurnoByMedico = async (req, res) => {
    try {
        var turnos = await Turno.find({medico: req.params.medico}).sort({ fechaturno: -1 }).populate('medico paciente');
        if(!turnos) return res.status(404).json({msg: 'No hay turnos para este medico'});
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error buscar turnos por medico'});
    }
}

//busca por paciente
controlTurno.getTurnoByPaciente = async (req, res) => {
    try {
        var turnos = await Turno.find({paciente: req.params.paciente}).sort({ fechaturno: -1 }).populate('medico paciente');
        if(!turnos) return res.status(404).json({msg: 'No hay turnos para este paciente'});
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error buscar getTurnoByPaciente'});
    }
}

//busca por sala
controlTurno.getTurnoBySala = async (req, res) => {
    try {
        const regex = new RegExp(req.params.sala, 'i'); // 'i' para hacer la búsqueda case-insensitive
        var turnos = await Turno.find({ sala: regex }).sort({ fechaturno: -1 });
        if (!turnos) return res.status(404).json({ msg: `No hay turnos para la sala que coincide con '${req.params.sala}'` });
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al buscar el último turno por sala' });
    }
}

//busca por pagado
controlTurno.getTurnoByPagado = async (req, res) => {
    try {
        var turnos = await Turno.find({pagado: req.params.pagado}).sort({fechaturno: 1});
        if(!turnos) return res.status(404).json({msg: 'No hay turnos con ese estado de pago'});
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error buscar turnos por estado de pago'});
    }
}


//borrar turno
controlTurno.deleteTurno = async (req, res) => {
    try {
        var turno = await Turno.findByIdAndDelete(req.params.id);
        if(!turno) return res.status(404).json({msg: 'No exite turno con ese ID'});
        res.json({
            msg: 'TURNO eliminado.'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error al eliminar turno'});
    }
}


controlTurno.getTurnoAsc = async (req, res) => {
    try {
        var turnos = await Turno.find().sort({fechaturno: 1});
        if(!turnos) return res.status(404).json({msg: 'No hay turnos en tabla'});
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error al buscar turnos ascendentemente'});
    }
}



controlTurno.getTurnoDesc = async (req, res) => {
    try {
        var turnos = await Turno.find().sort({fechaturno: -1});
        if(!turnos) return res.status(404).json({msg: 'No hay turnos en tabla'});
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error al buscar turnos descendentemente'});
    }
}


controlTurno.getTurnoSalaAsc = async (req, res) => {
    try {
        const regex = new RegExp(req.params.sala, 'i'); // 'i' para hacer la búsqueda case-insensitive
        var turnos = await Turno.find({ sala: regex }).sort({ fechaturno: -1 });
        if (!turnos) return res.status(404).json({ msg: `No hay turnos para la sala que coincide con '${req.params.sala}'` });
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al buscar el último turno por sala' });
    }
}


//buscar turno por medico y paciente

controlTurno.getTurnoByMedicoAndPaciente = async (req, res) => {
    try {
        var turnos = await Turno.find({medico: req.params.medico, paciente: req.params.paciente}).sort({ fechaturno: -1 });
        if(!turnos) return res.status(404).json({msg: 'No hay turnos con esa medico y paciente'});
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error buscar turnos por medico y paciente'});
    }
}


controlTurno.getTurnoOrder = async (req, res) => {
    try {
        var turnos = await Turno.find().sort({fechaturno: req.params.order});
        if(!turnos) return res.status(404).json({msg: 'No hay turnos en tabla'});
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error al buscar turnos por orden fechaturno'});
    }
}



controlTurno.getTurnoByEnfermedad = async (req, res) => {
    try {
        const regex = new RegExp(req.params.enfermedad, 'i'); // 'i' para hacer la búsqueda case-insensitive
        var turnos = await Turno.find({ enfermedad: regex }).sort({ fechaturno: -1 });
        if (!turnos) return res.status(404).json({ msg: `No hay turnos para la sala que coincide con '${req.params.enfermedad}'` });
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al buscar el último turno por sala' });
    }
}



controlTurno.getTurnoByTipoPago = async (req, res) => {
   //busca por tipo pago y devuelve ordenada por fechaturno descendente
    try {
        var turnos = await Turno.find({tipoPago: req.params.tipoPago}).sort({ fechaturno: -1 });
        if(!turnos) return res.status(404).json({msg: 'No hay turnos con ese tipo de pago'});
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error buscar turnos por tipo de pago'});
    }
}


controlTurno.updateTurno = async (req, res) => {
    try {
        var turno = await Turno.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!turno) return res.status(404).json({msg: 'No hay turno con ese ID'});
        res.json(turno);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error al modificar turno'});
    }
}

// devolver el ultimo turno cargado , despues del post

controlTurno.getLastTurno = async (req, res) => {
    try {
        var turno = await Turno.findOne().sort({_id: -1});
        if(!turno) return res.status(404).json({msg: 'No hay turnos en la tabla'});
        res.json(turno);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error al buscar el ultimo turno'});
    }
} 

// devuelve todos los turnos

controlTurno.getAllTurnos = async (req, res) => {
    try {
        var turnos = await Turno.find();
        if(!turnos) return res.status(404).json({msg: 'No hay turnos en la tabla'});
        res.json(turnos);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error al buscar todos los turnos'});
    }
}


controlTurno.updateTTurnos = async (req, res) => {
    try {
        const operations = req.body.map(item => ({
            updateOne: {
                filter: { _id: item._id },
                update: { $set: { estado: 'cancelado' } }
            }
        }));
        const result = await Turno.bulkWrite(operations);
        // Verificar si se modificaron documentos
        if (result.modifiedCount === 0) {
            return res.status(404).json({ msg: 'No se encontraron turnos con esos filtros.' });
        }
        // Enviar respuesta al cliente
        res.json({ msg: `${result.modifiedCount} turnos modificados.` });
    } catch (error) {
        console.error('Error al modificar turnos:', error);
        res.status(500).json({ msg: 'Error al modificar turnos.' });
    }
}



controlTurno.deleteMany = async (req, res) => {
    try {
        const ids = req.body; // `req.body` debe ser el arreglo de `_id` enviados desde el cliente
        const result = await Turno.deleteMany({ _id: { $in: ids } });
        // Verificar si se eliminaron documentos
        if (result.deletedCount === 0) {
          return res.status(404).json({ msg: 'No se encontraron turnos con esos filtros.' });
        }
    
        // Enviar respuesta al cliente
        res.json({ msg: `${result.deletedCount} turnos eliminados.` });
      } catch (error) {
        console.error('Error al eliminar turnos:', error);
        res.status(500).json({ msg: 'Error al eliminar turnos.' });
        console.log(req.body);
      }
}


controlTurno.updateVigente = async (req, res) => {
    try {
        const operations = req.body.map(item => ({
            updateOne: {
                filter: { _id: item._id },
                update: { $set: { estado: 'vigente' } }
            }
        }));
        const result = await Turno.bulkWrite(operations);
        // Verificar si se modificaron documentos
        if (result.modifiedCount === 0) {
            return res.status(404).json({ msg: 'No se encontraron turnos con esos filtros.' });
        }
        // Enviar respuesta al cliente
        res.json({ msg: `${result.modifiedCount} turnos modificados recuperados en vigencia.` });
    } catch (error) {
        console.error('Error al modificar turnos cancelados a vigencia:', error);
        res.status(500).json({ msg: 'Error al modificar turnos cancelados a vigencia.' });
    }
}


module.exports = controlTurno;