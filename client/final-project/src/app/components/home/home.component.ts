import { Component } from '@angular/core';
import { NovedadService } from '../../services/novedad.service';
import { Novedades } from '../../models/novedades';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  novedades: Array<Novedades>

  constructor(private novedadesService: NovedadService) {
    this.novedades = new Array<Novedades>();
    this.getNovedades()
  }

  getNovedades() {
    this.novedadesService.getNovedades().subscribe(
      (data) => {
        console.log(data);
        let novedad: Novedades = new Novedades();
        data.forEach((element: any) => {
          Object.assign(novedad, element);
          this.novedades.push(novedad);
          novedad = new Novedades();
        })
      },
      (err) => {
        console.log();
      }
    )
  }
}
