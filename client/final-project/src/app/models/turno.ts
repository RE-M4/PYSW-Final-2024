import { Medico } from '../models/medico';
import { Paciente } from '../models/paciente';

export class Turno {
    _id!:string;
    fechaturno:Date;
    horaturno:Date;
    sala:String;
    pagado:boolean;
    estado:String;
    paciente:Paciente;
    medico:Medico;
    
    constructor(){
        this.fechaturno = new Date();
        this.horaturno = new Date();
        this.sala = "";
        this.pagado = false;
        this.estado = "";
        this.paciente = new Paciente();
        this.medico = new Medico();
    }   
 
}
