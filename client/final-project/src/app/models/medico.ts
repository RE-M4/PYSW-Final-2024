
import { Contacto } from '../models/contacto';

export class Medico {

    _id!:string;
    apellido:String;
    nombre:String;    
    dni:Number;
    matricula:String;
    domicilio:String;
    contactos: Array<Contacto>;
    
    constructor (){
        this.contactos = new Array<Contacto>();
        this.apellido = "";
        this.nombre = "";
        this.dni = 0;
        this.matricula = "";
        this.domicilio = "";

    }

}
