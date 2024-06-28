import { Pipe, PipeTransform } from '@angular/core';
import { Medico } from './models/medico';
import { MedicoService } from './services/medico.service';

@Pipe({
  name: 'apellidoMedico',
  standalone: true
})
export class ApellidoMedicoPipe implements PipeTransform {
  // medico!: Medico;
  // medicos!: Array<Medico>;


  constructor(
   // private sMedico: MedicoService
  ){ }
//      this.medico = new Medico();
//     this.medicos = new Array<Medico>();}

//  // cargar medicos
//  cargaMedico() {
//   this.sMedico.getMedico().subscribe(
//     (result: any) => {
//       this.medicos = new Array<Medico>();
//       console.log("CARGA CORRECTA Medico");
//       let maxx = result.length; console.log("lenght:" + maxx);
//       for (var i = 0; i < maxx; i++) {
//         this.medico = new Medico();
//         this.medico._id = result[i]._id;
//         this.medico.apellido = result[i].apellido;
//         this.medico.nombre = result[i].nombre;
//         this.medico.dni = result[i].dni;
//         this.medico.matricula = result[i].matricula;
//         this.medico.domicilio = result[i].domicilio;
//         this.medico.contactos = result[i].contactos;
//         this.medicos.push(this.medico);
//       }
//     },
//     (error: any) => { console.log(error); console.log("ERROR CARGA Medico"); }
//   )
// }


// //ngOnInit() { this.cargaMedico();}


//   transform  (med: Medico) {
//       //   this.cargaMedico();
//      //let maxx = this.medicos.length;    
//      let idHistorial=med.toString(); console.log("param::"+idHistorial+"__");
//       //buscar medico como servicio
//       this.sMedico.getMedicoById(idHistorial).subscribe(
//         (result: any) => {
//         //  console.log("MEDICO encontrado");
//           this.medico = new Medico();
//           this.medico._id = result._id;
//           this.medico.apellido = result.apellido;
//           this.medico.nombre = result.nombre;
//           this.medico.dni = result.dni;
//           this.medico.matricula = result.matricula;
//           this.medico.domicilio = result.domicilio;
//           this.medico.contactos = result.contactos;
//           console.log("MEDICO encontrado:"+this.medico.apellido);

//         },
//         (error: any) => { console.log(error); console.log("ERROR BUSCA MEDICO Por id"); }
//       )
     
//      return this.medico.apellido;
//   }


transform(value: any, ...args: any[]) {
  
}


}
