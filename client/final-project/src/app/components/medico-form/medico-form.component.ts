import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/medico';

@Component({
  selector: 'app-medico-form',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './medico-form.component.html',
  styleUrl: './medico-form.component.css'
})
export class MedicoFormComponent {

  medico : Medico = new Medico();

  constructor(private medicoService: MedicoService){

  }

  saveMedico(){
    this.medicoService.postMedico(this.medico).subscribe(
      result => {
        if (result.status == 1){
          alert('Medico guardado correctamente');
        }
      }
    );
  }




}
