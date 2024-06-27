import { Administra } from '../models/administra';


export class Novedades {

    _id!: string;
    titulo: String;
    descripcion: String;
    fecha_ini: Date;
    estado: String;
    administra: Administra;

    constructor(){
        
        this.titulo = '';
        this.descripcion = '';
        this.fecha_ini = new Date();
        this.estado = '';
        this.administra = new Administra();
    }

       

}
