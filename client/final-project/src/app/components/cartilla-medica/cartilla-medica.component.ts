import { Component } from '@angular/core';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/medico';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cartilla-medica',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cartilla-medica.component.html',
  styleUrl: './cartilla-medica.component.css'
})
export class CartillaMedicaComponent {

  medicos!: Array<Medico>
  tipoBusqueda: string = 'especialidad';
  busquedaInput: string = '';

  constructor(private medicoService: MedicoService) { }

  ngOnInit(): void {
    this.medicos = new Array<Medico>();
    this.tipoBusqueda='todos';
    this.getAllMedicos();
  }

  getAllMedicos(): void {
    this.medicoService.getMedico().subscribe(data => {
      this.medicos = data;
    });
  }

  searchMedicos(): void {
    if (this.tipoBusqueda === 'especialidad') {
      this.medicoService.getMedicoByEspecialidad(this.busquedaInput).subscribe(data => {
        this.medicos = data;
      });
    } else {
      this.medicoService.getMedicoByNombreApellido(this.busquedaInput).subscribe(data => {
        this.medicos = data;
      });
    }
  }

  showAllMedicos(): void {
    this.getAllMedicos();
  }

  setBotonTipo(type: string): void {
    this.tipoBusqueda = type;
    this.medicos = new Array<Medico>();
    if (type === 'todos') {
      this.getAllMedicos();
    }
  }
  getPlaceholder(): string {
    if (this.tipoBusqueda === 'especialidad') {
      return 'Ejemplo: oftalmología';
    } else if (this.tipoBusqueda === 'nombre') {
      return 'Ejemplo: Laura';
    } else {
      return '';
    }
  }
}
