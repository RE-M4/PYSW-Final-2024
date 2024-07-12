
import { Medico } from '../models/medico';
import { Paciente } from './paciente';

export class Historial {

    _id!:string;
    titulo:String;
    descripcion:String;    
    tratamiento:String;
    medico: Medico;
    paciente: Paciente;
    fecha_Inicio:Date;
    fecha_Fin:Date;
    estado:String;

    constructor(){
    
        this.titulo = "";
        this.descripcion = "";
        this.tratamiento = "";
        this.medico = new Medico();
        this.paciente = new Paciente();
        this.fecha_Inicio = new Date();
        this.fecha_Fin = new Date();
        this.estado = "";
    }

}
