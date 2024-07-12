import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente';
import { MedicoService } from '../../services/medico.service';
import { HistorialService } from '../../services/historial.service';
import { Historial } from '../../models/historial';
import { Medico } from '../../models/medico';
import { TurnoService } from '../../services/turno.service';
import { Turno } from '../../models/turno';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [RouterModule, NgFor, CommonModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {
  //----------Estos datos quemados estan a forma de ejemplo para configurar las card. Despues son reemplazados por los datos de la api-----------------
  /*usuarios: any = [{ fecha: "2024/05/05", hora: "05:30", medico: "Mercedez Sosa", paciente: "Juan Perez", enfermedad: "lupus", sala: "5", pagado: "Si", estado: "Pendiente" },
  { fecha: "2024/05/05", hora: "05:30", medico: "Mercedez Sosa", paciente: "Juan Perez", enfermedad: "lupus", sala: "5", pagado: "Si", estado: "Pendiente" },
  { fecha: "2024/05/05", hora: "05:30", medico: "Mercedez Sosa", paciente: "Juan Perez", enfermedad: "lupus", sala: "5", pagado: "Si", estado: "Pendiente" }
  ]*/
  //-----------------Fin datos quemados---------------------------

  historiales!: Historial[];
  userId!: string;
  userType!: string;
  userInfo!: any;
  turnos!:Turno[];
  paciente!: Paciente;
  constructor(
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private historialService: HistorialService,
    private turnoService: TurnoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.userType = this.route.snapshot.paramMap.get('type')!;

    this.paciente= new Paciente();
    this.loadUserData();

  }

  loadUserData(): void {
    if (this.userType === 'paciente') {
      this.pacienteService.getPacienteById(this.userId).subscribe(
        (result: any) => {
          console.log(result);
          this.userInfo = result;
          this.paciente = result;
          console.log(this.paciente);
        },
        (error: any) => {
          console.log(error);
        }
      );

      this.historialService.getHistorialByPaciente(this.userId).subscribe(
        (result: any) => {
          console.log(result);
          this.historiales = result;
        },
        (error: any) => {
          console.log(error);
        }
      );

      this.turnoService.getTurnoPaciente(this.userId).subscribe(
        (result: any) => {
          console.log(result);
          this.turnos = result;
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else if (this.userType === 'medico') {
      this.medicoService.getMedicoById(this.userId).subscribe(
        (result: any) => {
          console.log(result);
          this.userInfo = result;
        },
        (error: any) => {
          console.log(error);
        }
      );

      this.historialService.getHistorialByMedico(this.userId).subscribe(
        (result: any) => {
          console.log(result);
          this.historiales = result;
        },
        (error: any) => {
          console.log(error);
        }
      );
      this.turnoService.getTurnoMedico(this.userId).subscribe(
        (result: any) => {
          console.log(result);
          this.turnos = result;
        },
        (error: any) => {
          console.log(error);
        }
      )
    }
  }
  modificar(user:any):void {
    if(this.userType=='paciente'){
    this.router.navigate(['register', user._id]);
    }
    else if (this.userType=='medico'){
      this.router.navigate(['medico-form', user._id]);
    }
  }
}
