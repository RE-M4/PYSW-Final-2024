
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  dni: String;
  password: String;

  constructor(private router:Router){    
    this.dni = "";
    this.password = "";
    console.log(this.dni);
    console.log(this.password);
  } 

  ngOnInit(): void {
    
  }
  agregar(){
    this.router.navigate(['register',0]);
  }
}
