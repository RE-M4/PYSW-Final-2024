import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NovedadService } from '../../services/novedad.service';
import { Novedades } from '../../models/novedades';


@Component({
  selector: 'app-novedad',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './novedad.component.html',
  styleUrl: './novedad.component.css'
})
export class NovedadComponent {
  novedad!: Novedades;
  novedades!: Array<Novedades>;
  novedadSeleccionada!: any;
  tipoNovedadSeleccionada: string = '';
  todasNovedades!: Array<Novedades>;

  constructor(private novedadService: NovedadService, private router: Router) { 
    this.obtenerNovedades();
    this.todasNovedades = [];
    this.novedades = [];
    this.obtenerNovedades();
  }

  //obtener todas las novedades
  obtenerNovedades() {
    this.novedadService.getNovedades().subscribe(
      data => {
        this.todasNovedades = data;
        this.novedades = data;
      },
      error => {
        console.log(error);
      }
    );
  }

 //filtrar novedades por tipo
  filtrarNovedades(tipo: string) {
    this.tipoNovedadSeleccionada = tipo;
  if (tipo === '') {
    this.novedades = this.todasNovedades;
  } else {
    this.novedades = this.todasNovedades.filter(n => n.tipo === tipo);
  }
  }

  //obtener novedad por ID
  obtenerNovedadId(noticia: any) {
    this.novedadSeleccionada = noticia;
    this.novedadService.getNovedadId(noticia._id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  //crear novedad
  crearNovedad(){
    this.router.navigate(['/novedad-form', 0]);
  }

  editarNovedad(id: any) {
    this.router.navigate(['/novedad-form', id]);
  }

  //eliminar novedad
  eliminarNovedad(id: any) {
    this.novedadService.deleteNovedad(id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
