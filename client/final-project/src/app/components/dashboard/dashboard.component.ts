import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdministraService } from '../../services/administra.service';
import { Administra } from '../../models/administra';
import { Contacto } from '../../models/contacto'
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  admins!:Array<Administra>;
  admin!: Administra;
  dniAdmin!: any;

  constructor(private administraService: AdministraService, private router: Router) {
    this.obtenerAdmins();
  }

  //obtener todos los administrativos
  obtenerAdmins() {
    this.administraService.getAdmins().subscribe(
      data => {
        this.admins = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  obtenerAdminByDni(dni: any) {
    this.administraService.getAdminDni(dni).subscribe(
      data => {
        console.log("este es el dni que quiero buscar",dni);
        this.admin = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  //crear admin
  crearAdmin() {
    this.router.navigate(['/register', 0 ]);
  }

  //editar admin
  editarAdmin(admin: Administra) {
    this.router.navigate(['/register', admin._id]);
  }

  //eliminar admin
  eliminarAdmin(_id: string) {
    this.administraService.deleteAdmin(_id).subscribe(
      (result) => {
        if(result.status == 1){
          alert('Producto eliminado');
          this.obtenerAdmins();
          //this.router.navigate(['producto']);
        }
      },
      (error:any) => {
        console.log(error);
      }
    );
  }

}
