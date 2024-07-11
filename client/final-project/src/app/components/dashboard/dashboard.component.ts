import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Administra } from '../../models/administra';
import { AdministraService } from '../../services/administra.service';
import { Contacto } from '../../models/contacto'
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Medico } from '../../models/medico';
import { MedicoService } from '../../services/medico.service';
import { Paciente } from '../../models/paciente';
import { PacienteService } from '../../services/paciente.service';
import { PublicComponent } from '../public/public.component';
import { NovedadComponent } from '../novedad/novedad.component';
import { NovedadFormComponent } from '../novedad-form/novedad-form.component';
import { Novedades } from '../../models/novedades';
import { NovedadService } from '../../services/novedad.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule, PublicComponent, NovedadComponent, NovedadFormComponent],
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
  pacientes!:Array<Paciente>;
  paciente!:Paciente;
  dniPaciente!:any;
  novedades!: Array<Novedades>;
  novedad!: Novedades;
  
  constructor(private administraService: AdministraService, private router: Router, private medicoService: MedicoService,private pacienteService:PacienteService, private novedadService: NovedadService)
  { this.obtenerAdmins();
    this.obtenerMedicos();
    this.obtenerPacientes();
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


  //eliminar admin
  eliminarAdmin(_id: string) {
    this.administraService.deleteAdmin(_id).subscribe(
      (result) => {
        if(result.status == 1){
          alert('Producto eliminado');
          this.obtenerAdmins();
          //this.router.navigate(['dashboard']);
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
  //Obtener todos los pacientes
  obtenerPacientes(){
    this.pacienteService.getPaciente().subscribe(
      data => {
        this.pacientes = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  //obtener paciente por dni
  obtenerPacienteByDni(dni: any){
    this.pacienteService.getPacienteByDni(dni).subscribe(
      data => {
        console.log("este es el dni que quiero buscar",dni);
        this.paciente = data;
      },
      error =>{
        console.log(error);
      }
    )
  }

  //Redirige al formulario de medico para modificar sus datos
  modificarPaciente(id:any){
    this.router.navigate(['register', id]);
  }

  //Elimina un medico
  deletePaciente(id:any){
    this.pacienteService.delete(id).subscribe(
      (result) => {
        if(result.status == 1){
          this.obtenerPacientes();
        }
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  //eliminarNovedad
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
