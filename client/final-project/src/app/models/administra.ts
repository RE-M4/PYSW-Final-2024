

import { Contacto } from './contacto';

export class Administra {

    _id!: string;
    apellido: String;
    nombre: String;
    dni: Number;
    password: String;
    activo: Boolean;
    fecha_alta: Date;
    contactos: Array<Contacto>;
    perfil: String;

    
    constructor() {
        this.contactos = new Array<Contacto>();
        this.perfil = "admin";
        this.activo = true;
        this.fecha_alta = new Date();
        this.apellido = "";
        this.nombre = "";
        this.dni = 0;
        this.password = "";


    }



}
