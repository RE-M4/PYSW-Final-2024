
import { Contacto } from '../models/contacto';

export class Medico {

    _id!:string;
    apellido:String;
    nombre:String;    
    dni:Number;
    matricula:String;
    domicilio:String;
    especialidad:String;
    contactos: Array<Contacto>;
    fechaingreso: Date;
    
    constructor (){
        this.contactos = [new Contacto()];
        this.apellido = "";
        this.nombre = "";
        this.dni = 0;
        this.matricula = "";
        this.domicilio = "";
        this.especialidad = "";
        this.fechaingreso = new Date();
    }

}
