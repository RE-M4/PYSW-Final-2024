import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdministraService } from '../../services/administra.service';
import { Administra } from '../../models/administra';
import { Contacto } from '../../models/contacto'
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Medico } from '../../models/medico';
import { MedicoService } from '../../services/medico.service';

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
  medicos!:Array<Medico>;
  medico!: Medico;
  dniMedico!: any;
  
  constructor(private administraService: AdministraService, private router: Router, private medicoService: MedicoService) {
    this.obtenerAdmins();
    this.obtenerMedicos();
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

   //obtener todos los medicos
   obtenerMedicos() {
    this.medicoService.getMedico().subscribe(
      data => {
        this.medicos = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  //obtener medico por dni
  obtenerMedicoByDni(dni: any){
    this.medicoService.getMedicoByDni(dni).subscribe(
      data => {
        console.log("este es el dni que quiero buscar",dni);
        this.medico = data;
      },
      error =>{
        console.log(error);
      }
    )
  }

  //Redirige al formulario de medico para modificar sus datos
  modificarMedico(id:any){
    this.router.navigate(['medico-form', id]);
  }

  //Elimina un medico
  deleteMedico(id:any){
    this.medicoService.deleteMedico(id).subscribe(
      (result) => {
        if(result.status == 1){
          this.obtenerMedicos();
        }
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

}
