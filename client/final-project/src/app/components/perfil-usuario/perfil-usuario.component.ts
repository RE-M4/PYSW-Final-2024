import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [RouterModule, NgFor],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {
  //----------Estos datos quemados estan a forma de ejemplo para configurar las card. Despues son reemplazados por los datos de la api-----------------
  usuarios: any = [{ fecha: "2024/05/05", hora: "05:30", medico: "Mercedez Sosa", paciente: "Juan Perez", enfermedad: "lupus", sala: "5", pagado: "Si", estado: "Pendiente" },
  { fecha: "2024/05/05", hora: "05:30", medico: "Mercedez Sosa", paciente: "Juan Perez", enfermedad: "lupus", sala: "5", pagado: "Si", estado: "Pendiente" },
  { fecha: "2024/05/05", hora: "05:30", medico: "Mercedez Sosa", paciente: "Juan Perez", enfermedad: "lupus", sala: "5", pagado: "Si", estado: "Pendiente" }
  ]
  //-----------------Fin datos quemados---------------------------

  constructor(private pacienteService:PacienteService,private router:Router){
    this.obtenerPaciente();
  }
  paciente!:Paciente;

  obtenerPaciente(){
      this.pacienteService.getPaciente().subscribe(
        (result:any)=>{
          console.log(result);
          this.paciente=result[0];
          },
        (error:any)=>{
          console.log(error);
        }
      )
    }
    modificar(paciente:Paciente){
      this.router.navigate(['register', paciente._id]);
    }
}
