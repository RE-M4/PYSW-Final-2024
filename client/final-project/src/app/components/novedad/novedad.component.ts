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
  constructor(private novedadService: NovedadService, private router: Router) { }

  //obtener todas las novedades
  obtenerNovedades() {
    this.novedadService.getNovedades().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  //obtener novedades por estado procesado o pendiente
  obtenerNovedadesEstado(estado: any) {
    this.novedadService.getNovedadesEstado(estado).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  //obtener novedad por ID
  obtenerNovedadId(id: any) {
    this.novedadService.getNovedadId(id).subscribe(
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
