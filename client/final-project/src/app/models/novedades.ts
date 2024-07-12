import { Administra } from '../models/administra';


export class Novedades {

    _id!: string;
    titulo: String;
    descripcion: String;
    fecha_ini: Date;
    imagen: String;
    tipo: String;
    administra: Administra;

    constructor(){
        
        this.titulo = '';
        this.descripcion = '';
        this.fecha_ini = new Date();
        this.imagen = '';
        this.tipo = '';
        this.administra = new Administra();
    }



}
