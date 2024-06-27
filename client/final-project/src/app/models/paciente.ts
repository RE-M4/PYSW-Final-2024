
import { Contacto } from '../models/contacto';
import { Historial } from '../models/historial';

export class Paciente {
    _id!:string;
    apellido:String;
    nombre:String;
    dni:Number;
    domicilio:String;
    contactos: Array<Contacto>;
    historia: Array<Historial>;    

    constructor(){
      this.contactos = new Array<Contacto>();
      this.historia = new Array<Historial>();
      this.apellido = "";
      this.nombre = "";
      this.dni = 0;
      this.domicilio = "";


    }
}
