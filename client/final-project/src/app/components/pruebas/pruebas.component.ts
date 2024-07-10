
import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { Paciente } from '../../models/paciente';
import { Medico } from '../../models/medico';
import { Turno } from '../../models/turno';
import { Contacto } from '../../models/contacto';
import { Historial } from '../../models/historial';
import { Administra } from '../../models/administra';
import { Novedades } from '../../models/novedades';

import { ContactoService } from '../../services/contacto.service';
import { MedicoService } from '../../services/medico.service';
import { AdministraService } from '../../services/administra.service';
import { HistorialService } from '../../services/historial.service';
import { NovedadService } from '../../services/novedad.service';
import { PacienteService } from '../../services/paciente.service';
import { TurnoService } from '../../services/turno.service';
import { elementAt } from 'rxjs';
import { ApellidoMedicoPipe } from "../../apellido-medico.pipe";


@Component({
    selector: 'app-pruebas',
    standalone: true,
    templateUrl: './pruebas.component.html',
    styleUrl: './pruebas.component.css',
    imports: [FormsModule, CommonModule, RouterModule]
})


export class PruebasComponent {
 

  contac!: Contacto;
  contactos!: Array<Contacto>;
  paciente!: Paciente;
  pacientes!: Array<Paciente>;
  medico!: Medico;
  medicos!: Array<Medico>;
  turno!: Turno;
  turnos!: Array<Turno>;
  historial!: Historial;
  historiales!: Array<Historial>;
  administra!: Administra;
  administradores!: Array<Administra>;
  novedad!: Novedades;
  novedades!: Array<Novedades>;


  idHistorial!:string;  titulo!:string; descrip!: string; trata!: string; estado!: string; fechaInicio = new Date(); fechaFin = new Date();
  sala!: string; pagado!: boolean; estadoTurno!: string;
  apel!:String;  ddni!: String;  docu!:Number;


  constructor(
    private sContacto: ContactoService,
    private sMedico: MedicoService,
    private sPaciente: PacienteService,
    private sTurno: TurnoService,
    private sHistorial: HistorialService,
    private sAdministra: AdministraService,
    private sNovedad: NovedadService,
   
  ) {
    this.contac = new Contacto();
    this.contactos = new Array<Contacto>();
    this.paciente = new Paciente();
    this.pacientes = new Array<Paciente>();
    this.medico = new Medico();
    this.medicos = new Array<Medico>();
    this.turno = new Turno();
    this.turnos = new Array<Turno>();
    this.historial = new Historial();
    this.historiales = new Array<Historial>();
    this.administra = new Administra();
    this.administradores = new Array<Administra>();
    this.novedad = new Novedades();
    this.novedades = new Array<Novedades>();
  }

 

  ngOnInit() { 
   
    this.cargaContacto();
    this.cargaMedico();
    this.cargaPaciente();
  }


  cargaContacto() {
    this.sContacto.getContacto().subscribe(
      (result: any) => {
        this.contactos = new Array<Contacto>();
        console.log("CARGA CORRECTA Contacto");
        let maxx = result.length; console.log("lenght:" + maxx);
        for (var i = 0; i < maxx; i++) {
          this.contac = new Contacto();
          this.contac._id = result[i]._id;
          this.contac.tipo = result[i].tipo;
          this.contac.valor = result[i].valor;
          this.contactos.push(this.contac);
        }
      },
      (error: any) => { console.log(error); console.log("ERROR CARGA Contacto"); }
    )
  }



  // cargaPaciente
  cargaPaciente() {
    this.sPaciente.getPaciente().subscribe(
      (result: any) => {
        this.pacientes = new Array<Paciente>();
        console.log("CARGA CORRECTA Paciente");
        let maxx = result.length; console.log("lenght:" + maxx);
        for (var i = 0; i < maxx; i++) {
          this.paciente = new Paciente();
          this.paciente._id = result[i]._id;
          this.paciente.apellido = result[i].apellido;
          this.paciente.nombre = result[i].nombre;
          this.paciente.dni = result[i].dni;
          this.paciente.domicilio = result[i].domicilio;
          this.paciente.contactos = result[i].contactos;
          this.paciente.historia = result[i].historia;
          this.pacientes.push(this.paciente);
        }
      },
      (error: any) => { console.log(error); console.log("ERROR CARGA Paciente"); }
    )
  }


  // cargar medicos
  cargaMedico() {
    this.sMedico.getMedico().subscribe(
      (result: any) => {
        this.medicos = new Array<Medico>();
        console.log("CARGA CORRECTA Medico");
        let maxx = result.length; console.log("lenght:" + maxx);
        for (var i = 0; i < maxx; i++) {
          this.medico = new Medico();
          this.medico._id = result[i]._id;
          this.medico.apellido = result[i].apellido;
          this.medico.nombre = result[i].nombre;
          this.medico.dni = result[i].dni;
          this.medico.matricula = result[i].matricula;
          this.medico.domicilio = result[i].domicilio;
          this.medico.contactos = result[i].contactos;
          this.medicos.push(this.medico);
        }
      },
      (error: any) => { console.log(error); console.log("ERROR CARGA Medico"); }
    )
  }


  cargaHistorial() {
    this.sHistorial.getHistorial().subscribe(
      (result: any) => {
        this.historiales = new Array<Historial>();
        console.log("CARGA CORRECTA Historial");
        let maxx = result.length; console.log("lenght:" + maxx);
        for (var i = 0; i < maxx; i++) {
          this.historial = new Historial();
          this.historial._id = result[i]._id;
          this.historial.titulo = result[i].titulo;
          this.historial.descripcion = result[i].descripcion;
          this.historial.tratamiento = result[i].tratamiento;
          this.historial.fecha_Inicio = result[i].fecha_Inicio;
          this.historial.fecha_Fin = result[i].fecha_Fin;
          this.historial.estado = result[i].estado;
          this.historiales.push(this.historial);
        }
      },
      (error: any) => { console.log(error); console.log("ERROR CARGA Historial"); }
    )
  }


  cargaHist() {
    this.sHistorial.getHistorial().subscribe(
      (result: any) => {
        this.historiales = new Array<Historial>();
        console.log("CARGA CORRECTA Historial");
        let maxx = result.length; console.log("lenght:" + maxx);
        result.forEach((element: any) => {
          this.historial = new Historial();
          Object.assign(this.historial, element);
          this.historiales.push(this.historial);
        })
      }
    )
  }

  //carga Turno
  cargaTurno() {
    this.sTurno.getTurno().subscribe(
      (result: any) => {
        this.turnos = new Array<Turno>();
        console.log("CARGA CORRECTA Turnos");
        let maxx = result.length; console.log("lenght:" + maxx);
        result.forEach((element: any) => {
          this.turno = new Turno();
          Object.assign(this.turno, element);
          this.turnos.push(this.turno);
        })
      }
    )
  }


  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  altaTurno() {
    this.turno = new Turno();
    this.turno.fechaturno = this.fechaInicio;
    this.turno.horaturno = this.fechaInicio;
    this.turno.sala = this.sala;
    this.turno.pagado = this.pagado;
    this.turno.paciente = this.pacientes[2];
    this.turno.medico = this.medicos[2];
    this.turno.estado = this.estadoTurno;
    this.sTurno.postTurno(this.turno).subscribe(
      (result: any) => {
        console.log("Alta Correcta Turno"); alert("ALTA_CORRECTA_TURNO");
      },
      (error: any) => { console.log(error); console.log("ERROR ALTA Turno"); alert("ERROR_ALTA_TURNO"); }
    )
  }



  altaHistorial() {
    //  var afterr = new Calendar(this.fechaFin);
    //calendar = Calendar.getInstance(); 
    // sumar 1 mes a fechaFin
    //calendar.add(Calendar.MONTH, 1);
    //this.fechaFin = calendar.getTime();
    //this.fechaFin = new Date(this.fechaFin);

    this.fechaFin.setDate(this.fechaInicio.getDate() + 30);

    this.historial = new Historial();
    this.historial.titulo = this.titulo;
    this.historial.descripcion = this.descrip;
    this.historial.tratamiento = this.trata;
    this.historial.medico = this.medicos[1];
    this.historial.fecha_Inicio = this.fechaInicio;
    this.historial.fecha_Fin = this.fechaFin;
    this.historial.estado = this.estado;
    this.sHistorial.postHistorial(this.historial).subscribe(
      (result: any) => {
        console.log("Alta Correcta Historial"); alert("ALTA_CORRECTA_HISTORIAL");
      },
      (error: any) => { console.log(error); console.log("ERROR ALTA Historial"); alert("ERROR ALTA_HISTORIAL"); }
    )
    //  this.cargaHistorial();
  }


  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // busca turno por medico
  buscarTurnosPorMedico() {
    this.medico = this.medicos[0];
    this.sTurno.getTurnoPorMedico(this.medico).subscribe(
      (result: any) => {
        this.turnos = new Array<Turno>();
        console.log("BUSQUEDA CORRECTA Turnos Por Medico");
        alert("Turnos_encontrados con Medico::" + this.medico.apellido + "__" + this.medico.dni);
        let maxx = result.length; console.log("lenght:" + maxx);
        result.forEach((element: any) => {
          this.turno = new Turno();
          Object.assign(this.turno, element);
          this.turnos.push(this.turno);
        })
      },
      (error: any) => { console.log(error); console.log("ERROR BUSCA Turnos Por Medico"); }
    )
  }


 
     buscaDNIyApellido (med: Medico){        
      let idd=med.toString();
        let max = this.medicos.length;
        for (let i = 0; i < max; i++) {
          if (this.medicos[i]._id === idd )  {
             this.apel=this.medicos[i].apellido;  
             this.docu=this.medicos[i].dni;
            
          }
        }    
        return this.apel;
     }
       


     


       
      


}
