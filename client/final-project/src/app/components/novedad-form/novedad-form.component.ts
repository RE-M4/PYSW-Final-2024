import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NovedadService } from '../../services/novedad.service';
import { Novedades } from '../../models/novedades';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Administra } from '../../models/administra';
import { AdministraService } from '../../services/administra.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-novedad-form',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './novedad-form.component.html',
  styleUrl: './novedad-form.component.css'
})
export class NovedadFormComponent {
  files: { base64: string, safeurl: SafeUrl }[] = [];
  novedad!: Novedades;
  idAdmin!: String;
  administrativo!: Array<Administra>;
  accion!: String;

  constructor (private novedadService: NovedadService, private router: Router,
    private domSanitizer: DomSanitizer, private administraService: AdministraService, private activatedRoute: ActivatedRoute) { 
    this.iniciarVariable();
    this.administrativo = new Array<Administra>();
    this.obtenerAdmins();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if(params['id'] == "0"){
          this.accion = 'new';
        }else{
          this.accion = "update";
          this.cargarNovedad(params['id']);

        }
      });
  }

  obtenerAdmins() {
    this.administraService.getAdmins().subscribe(
      data => {
        this.administrativo = data;
      },
      error => {
        console.log(error);
      }
    );
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
        alert("Novedad creada correctamente");
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

  cargarNovedad(id: String):void {
    this.novedadService.getNovedadId(id).subscribe(
      (result) => {
        Object.assign(this.novedad, result);
      },
      (error) => {
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
