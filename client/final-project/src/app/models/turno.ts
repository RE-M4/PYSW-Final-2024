import { Medico } from '../models/medico';
import { Paciente } from '../models/paciente';

export class Turno {
    _id!:string;
    fechaturno:Date;
    horaturno:Date;
    sala:String;
    enfermedad:String;
    pagado:boolean;
    precio:Number;
    tipoPago:String;
    estado:String;
    paciente:Paciente;
    medico:Medico;
    
    constructor(){
        
        this.fechaturno = new Date();
        this.horaturno = new Date();
        this.sala = "";
        this.enfermedad="";
        this.pagado = false;
        this.precio=0;
        this.tipoPago="";
        this.estado = "";
        this.paciente = new Paciente();
        this.medico = new Medico();
    }   
 
}
