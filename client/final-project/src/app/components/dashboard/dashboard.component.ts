import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
import { NgApexchartsModule } from 'ng-apexcharts';

//importacones de modulos para grafico de apexChart
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

// Definicion de la interface para las opciones del grafico
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule, PublicComponent, NovedadComponent, NovedadFormComponent, NgApexchartsModule],
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
  cantAdmins:any;
  cantMedicos:any;
  cantPacientes:any;


  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private administraService: AdministraService, private router: Router, private medicoService: MedicoService,private pacienteService:PacienteService, private novedadService: NovedadService)
  { this.obtenerAdmins();
    this.obtenerMedicos();
    this.obtenerPacientes();
    this.obtenerNovedades();

    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [0, 0, 0]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Usuarios Registrados"
      },
      xaxis: {
        categories: ["Adminstradores", "Medicos", "Pacientes"]
      }
    };

  }

  

  //obtener todos los administrativos
  obtenerAdmins() {
    this.administraService.getAdmins().subscribe(
      data => {
        this.admins = data;
        this.cantAdmins = this.admins.length;
        this.updateChart();
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
        this.cantMedicos = this.medicos.length;
        this.updateChart();
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
        this.cantPacientes = this.pacientes.length;
        this.updateChart();
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
        console.log("Novedad eliminada");
        alert('Novedad eliminada');
        this.obtenerNovedades();
      },
      error => {
        console.log(error);
      }
    );
  }

  //obtener todas las novedades
  obtenerNovedades() {
    this.novedadService.getNovedades().subscribe(
      data => {
        this.novedades = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  //editar novedad
  editarNovedad(id: any) {
    this.router.navigate(['/novedad-form', id]);
  }
  
  //carga los datos que traen los servicios
  updateChart() {
    this.chartOptions.series = [
      {
        name: "Cantidad:",
        data: [this.cantAdmins, this.cantMedicos, this.cantPacientes]
      }
    ];
  }

  //Redirige al perfil del paciente
  perfilPaciente(id:string){
    this.router.navigate(['perfil-usuario/paciente/', id]);
  }
  
  //Redirige al perfil del medico
  perfilMedico(id:string){
    this.router.navigate(['perfil-usuario/medico/', id]);
  }
}
