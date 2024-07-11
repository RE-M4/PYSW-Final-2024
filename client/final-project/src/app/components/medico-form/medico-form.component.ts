import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MedicoService } from '../../services/medico.service';
import { Medico } from '../../models/medico';

@Component({
  selector: 'app-medico-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './medico-form.component.html',
  styleUrl: './medico-form.component.css'
})
export class MedicoFormComponent {

  medico: Medico = new Medico();
  accion: boolean = false;
  constructor(private medicoService: MedicoService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  //Metodo que verifica si es un nuevo registro o una modificacion, si es modificacion asigna a loadMedico el id del medico
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.accion = true;
        this.loadMedico(params['id']);
        console.log(this.medico)
      }
    })
  }

  //Carga el medico a editar en caso de ser una modificacion
  loadMedico(id: any) {
    this.medicoService.getMedicoById(id).subscribe(
      data => {
        this.medico = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  //Metodo que guarda un nuevo medico en la base de datos
  saveMedico() {
    this.medicoService.postMedico(this.medico).subscribe(
      result => {
        if (result.status == 1) {
          this.router.navigate(['dashboard']);
        }
      }
    );
  }

  //Metodo que edita un medico existente en la base de datos
  editMedico() {
    this.medicoService.editMedico(this.medico._id, this.medico).subscribe(
      result => {
        if (result.status == 1) {
          this.router.navigate(['dashboard']);
        }
      }
    );
  }


}
