import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { CommonModule } from '@angular/common';
import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  paciente!: Paciente;
  constructor(public pacienteService: PacienteService) {
    this.obtenerPaciente()
  }

  obtenerPaciente() {
    if(sessionStorage.getItem('dni')!=null) {
      this.pacienteService.getPacienteByDni(sessionStorage.getItem('dni')).subscribe(
        (data) => {
          this.paciente = data;
          console.log(this.paciente._id);
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }
}
