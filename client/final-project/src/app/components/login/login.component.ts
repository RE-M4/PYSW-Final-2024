
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  pacienteform: Paciente = new Paciente(); //usuario mapeado al formulario
  returnUrl!: string;
  msglogin!: string; // mensaje que indica si no paso el loguin

  constructor(private router:Router, private pacienteService: PacienteService){    
    
  } 

  ngOnInit(): void {
    
  }
  agregar(){
    this.router.navigate(['register',0]);
  }

  login() {
    this.pacienteService.login(this.pacienteform.dni, this.pacienteform.password).subscribe(
    (result) => {
      var user = result;
      if (user.status == 1){
      console.log("Datos: " + user.id);
      
      //guardamos el user en cookies en el cliente
      sessionStorage.setItem("dni", user.dni);
      sessionStorage.setItem("id", user.id);
      //redirigimos a home o a pagina que llamo
      this.router.navigate(['home']);
      } else {
      //usuario no encontrado muestro mensaje en la vista
      this.msglogin="Credenciales incorrectas..";
      }
    },
    error => {
      alert("Error de conexion");
      console.log("error en conexion");
      console.log(error);
    });
    }
}
