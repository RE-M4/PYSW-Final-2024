import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NovedadService } from '../../services/novedad.service';
import { Novedades } from '../../models/novedades';
@Component({
  selector: 'app-novedad-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './novedad-form.component.html',
  styleUrl: './novedad-form.component.css'
})
export class NovedadFormComponent {
  novedad!: Novedades;

  constructor (private novedadService: NovedadService, private router: Router) { 
    this.iniciarVariable();
  }

  iniciarVariable() {
    this.novedad = new Novedades();
  }

  crearNovedad(){
    this.novedadService.createNovedad(this.novedad).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/novedad']);
        console.log("Novedad creada");
        alert("Tu novedad está siendo evaluada por el administrador. Gracias por tu paciencia. Pronto la verás publicada en la página.");
      },
      error => {
        console.log(error);
  }
  );
  }

  modificarNovedad(){
    this.novedadService.updateNovedad(this.novedad).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/novedad']);
        console.log("Novedad modificada correctamente");
      },
      error => {
        console.log(error);
  }
  );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file.size > 1024 * 1024) {
      event.target.value = null;
      alert("La imagen no debe pesar más de 1MB")
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        this.novedad.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
