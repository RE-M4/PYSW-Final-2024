
import { Contacto } from '../models/contacto';
import { Historial } from '../models/historial';

export class Paciente {
    _id!:string;
    apellido:String;
    nombre:String;
    dni:Number;
    domicilio:String;
    password:String;
    repassword:String;
    contactos: Array<Contacto>;   
    fechaingreso: Date;
    historia!: Array<Historial>;

    constructor(){
      this.contactos = [new Contacto()];
      this.apellido = "";
      this.nombre = "";
      this.dni = 0;
      this.domicilio = "";
      this.password="";
      this.repassword="";
      this.fechaingreso = new Date();
    }
}
