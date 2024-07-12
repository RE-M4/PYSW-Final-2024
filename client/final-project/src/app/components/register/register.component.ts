import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Paciente } from '../../models/paciente';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  accion!:string;
  paciente!:Paciente;

constructor(private activedRoute:ActivatedRoute,private pacienteService:PacienteService,private router:Router){
  this.iniciarVariable();
}

ngOnInit():void{
  this.activedRoute.params.subscribe(params =>{
    if (params['id']=="0"){
      this.accion="new";
      this.iniciarVariable();
    }else{
      this.accion="update";
      this.cargarPacienteById(params['id']);
    }
  })
}

iniciarVariable(){
  this.paciente= new Paciente();
}

crearPaciente(){
  this.pacienteService.addPaciente(this.paciente).subscribe(
    (result:any)=>{
      console.log(this.paciente.apellido);
      
      console.log(result);
      this.router.navigate(['login']);
    },
    (error:any)=>{
      console.log(error);
    }
  )
}
cargarPacienteById(id:string){
  this.pacienteService.getPacienteById(id).subscribe(
    (result:any)=>{
      console.log(result);
      Object.assign(this.paciente,result);
    },
    (error:any)=>{
      console.log(error);
    }
  )
}

modificar(){
  this.pacienteService.update(this.paciente).subscribe(
    (result:any)=>{
      console.log(result);
      if(result.status==1){
        this.router.navigate(['/perfil-usuario/paciente/', this.paciente._id]);
      }
    },
    (error:any)=>{
      console.log(error);
    }
  )  
}

/*pacientes:Array<Paciente>=[];
  paciente!:Paciente;
  constructor(private pacienteService:PacienteService,private router:Router) {

  }
  
  obtenerPaciente(){
    this.pacientes=[];
    this.pacienteService.getPaciente().subscribe(
      (result: any) => {
        result.forEach((element: any) => {
          let vpaciente = new Paciente();
          Object.assign(vpaciente, element);
          
            this.pacientes.push(vpaciente);
        });
      },
      (error: any) => {
        console.log(error)
      }
    )
  }
   addPaciente(){
    this.pacienteService.addPaciente(this.paciente).subscribe(
      (result:any)=>{
        console.log(result);
        Se adaptara a lo que el administrador necesite
      },
      (error:any)=>{
        console.log(error);
      }

    )
  }
  
  
  modificar(paciente:Paciente){
    this.router.navigate(['paciente-form', paciente._id]);
  }
    actualizar(){
      this.pacienteService.update(this.paciente).subscribe(
        (result:any)=>{
          console.log(result);
          if(result.status==1){
            this.router.navigate(['paciente'])
          }
              Se adaptara a lo que el administrador necesite
        },
        (error:any)=>{
          console.log(error);
        }
      )  
    }
      eliminar(paciente:Paciente){
    this.pacienteService.delete(paciente).subscribe(
      (result:any)=>{
        console.log(result)
        this.paciente=[];
          Se adaptara a lo que el administrador necesite
      },
      (error:any)=>{
        console.log(error)
      }
    )
  }
    */
}
