import { Component } from '@angular/core';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/medico';

@Component({
  selector: 'app-cartilla-medica',
  standalone: true,
  imports: [],
  templateUrl: './cartilla-medica.component.html',
  styleUrl: './cartilla-medica.component.css'
})
export class CartillaMedicaComponent {

  medicos: Array<Medico>

  constructor(private medicoService: MedicoService) {
    this.medicos = new Array<Medico>();
  }

  getMedicos() {
    this.medicoService.getMedico().subscribe(
      (data) => {
        
      }
    )
  }
}
