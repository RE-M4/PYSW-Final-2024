import { Component } from '@angular/core';
import { TurnoService } from '../../services/turno.service';
import { Turno } from '../../models/turno';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turno-registro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turno-registro.component.html',
  styleUrl: './turno-registro.component.css'
})
export class TurnoRegistroComponent {

  showPaymentButton: boolean;
  preferenceId: String;
  //"Test" es un objeto tipo "Turno" de prueba, la función de pagos debe ser adaptada para que trabaje con los turnos que vuelvan de la BBDD.
  test = new Turno();
  constructor(private turnoService: TurnoService) { 
    this.test._id = "1"
    this.test.estado = "Pendiente"
    this.showPaymentButton = false;
    this.preferenceId = "";
  }

  makePayment(){
    this.turnoService.makePayment(this.test).subscribe(
      (data:any) => {
        console.log(data);
        this.preferenceId = data.init_point;
        this.showPaymentButton = true;
      },
      (err:any) => {
        console.log(err);
      }
    )
  }
}
