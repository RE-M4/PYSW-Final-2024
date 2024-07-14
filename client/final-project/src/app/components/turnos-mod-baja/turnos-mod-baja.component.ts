import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Paciente } from '../../models/paciente';
import { Medico } from '../../models/medico';
import { Turno } from '../../models/turno';
import { MedicoService } from '../../services/medico.service';
import { PacienteService } from '../../services/paciente.service';
import { TurnoService } from '../../services/turno.service';
import { elementAt } from 'rxjs';
import { Config } from 'datatables.net';
import 'datatables.net-buttons-dt';
declare var $: any;
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
//import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-turnos-mod-baja',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './turnos-mod-baja.component.html',
  styleUrl: './turnos-mod-baja.component.css'
})


export class TurnosModBajaComponent {
  @ViewChild('ttablaTurno', { static: false }) table!: ElementRef;
  dtOptions: Config = {};

  paciente!: Paciente;
  pacienteAux!: Paciente;
  pacientes!: Array<Paciente>;
  listaPac!: Array<Paciente>;
  borradosPac!: Array<Paciente>;
  medico!: Medico;
  medicoAux!: Medico;
  medicos!: Array<Medico>;
  listaMed!: Array<Medico>;
  borradosMed!: Array<Medico>;
  turno!: Turno;
  turnoAux!: Turno;
  ttBusca!: Turno;
  MuestraTurno: Turno | undefined;
  turnos!: Array<Turno>;
  listaTurno!: Array<Turno>;
  turnosBusca!: Array<Turno>;
  paciBBusca: Paciente | undefined;
  mediBBusca: Medico | undefined;
  filaSeleccionada: number | null;
  filaEncontrada: number | null;
  ttBusca22 !: Array<Turno>;

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  apel!: String; ddni!: String; docu!: Number; idMedico!: string; idTurno!: string; ordenMedico!: number;
  apelPaciente!: String; docuPaciente!: Number; idPaciente!: string; ordenPaciente!: number; cadID = "";
  fecha:Date =new Date(); fechaMinima = new Date(); selectFecha = new Date(); sala!: string; pagado!: boolean; saberTitulo = "__";
  estadoTurno!: string; enfermedad!: string; tipoPago: string = "pami"; precio: Number = 1; hhora = 8; cadInfo = "";
  dniBusca!: Number; apellidoBusca!: string; fechaBusca!: Date; fechaMaxima = new Date(); tipoBusca!: number;
  apMedico!: String; dniMedico!: Number; apPaciente!: String; dniPaciente!: Number;  lastfila = "__";  azulrojo = "xx";
  turnoSeleccionado: number = -1; turnoRojo: number = -1; selectedRows: number[]=[]; selectedRojo: number[] = [];
  paginaActual: number; pageSize: number; BuscaTTurno!: number; total!: number;  arrayTurnos: string[] = [];

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  constructor(
    private sMedico: MedicoService,
    private sPaciente: PacienteService,
    private sTurno: TurnoService,
  ) {
    this.paciente = new Paciente();
    this.pacienteAux = new Paciente();
    this.pacientes = new Array<Paciente>();
    this.listaPac = new Array<Paciente>();
    this.borradosPac = new Array<Paciente>();
    this.medico = new Medico();
    this.medicoAux = new Medico();
    this.medicos = new Array<Medico>();
    this.listaMed = new Array<Medico>();
    this.borradosMed = new Array<Medico>();
    this.turno = new Turno();
    this.turnoAux = new Turno();
    this.ttBusca = new Turno();
    this.turnos = new Array<Turno>();
    this.listaTurno = new Array<Turno>();
    this.turnosBusca = new Array<Turno>();
    this.ttBusca22 = new Array<Turno>();
    this.fechaMinima = new Date();
    this.fechaMaxima = new Date();
    this.MuestraTurno = new Turno();
    this.paciBBusca = new Paciente();
    this.mediBBusca = new Medico();
    this.filaSeleccionada = null;
    this.filaEncontrada = null;
    this.paginaActual = 0;
    this.pageSize = 12;
    this.idTurno="-";
  }
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  ngOnInit() {
    this.limpiarSeleccion();
    this.cargaMedico();
    this.cargaPaciente();
    this.cargaTurno();
    this.actualizarItemsMostrados();
    this.cargarLastTurno (); 
    this.dtOptions = {
      // language:{ url 'cdn'  }
      pageLength: 10,
      dom: 'Bfrtip',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
    }
  }

  cambiarFecha2(fecha: Date) {  this.fecha = fecha;}

  
  cargarLastTurno (){
     var ii = -1;
     let maxx = 0;
     this.sTurno.getLastTurno().subscribe(
       (result: any) => {
         maxx = result.length; console.log("lenght:" + maxx);
         ii++;
         this.turno = new Turno();
         Object.assign(this.turno, result);
         this.idTurno = this.turno._id.toString();
         console.log("Ultimo_turno ID:::" + this.turno._id.toString());
         console.log("FECHA:::" + this.turno.fechaturno);
         console.log("ENFERMEDAD:::" + this.turno.enfermedad);
         console.log("SALA::" + this.turno.sala);
         console.log("Ultimo_Turno_Correcto");
     
        let fechaElegida = new Date(this.turno.fechaturno);
         fechaElegida.setDate(fechaElegida.getDate() );
         fechaElegida.setHours(fechaElegida.getHours() ); 
         fechaElegida.setMinutes(0); fechaElegida.setSeconds(0); fechaElegida.setMilliseconds(0);
   
         this.estadoTurno=this.turno.estado.toString();
         this.sala = this.turno.sala.toString();
         this.enfermedad = this.turno.enfermedad.toString();
         this.pagado=this.turno.pagado;
         this.precio=this.turno.precio;
         this.tipoPago=this.turno.tipoPago.toString();
         this.hhora=fechaElegida.getHours();
         this.cambiarFecha2 (fechaElegida);
         this.idMedico=this.turno.medico.toString();
         this.idPaciente= this.turno.paciente.toString();
       }
     )
  } 

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      
    bbuscarPPagina(yyddturno:string){
      let mmmax=this.listaTurno.length;
      let pag: number=0;
      let resulttt: number=0;
      let chekeo=false;
      for (let i=0; i<mmmax; i++){ pag=i+1;  
        if ( this.listaTurno[i]._id ==yyddturno){ chekeo=true;
          if(pag < this.pageSize ){ this.paginaActual=0;}
           else { resulttt= Math.floor(pag / this.pageSize); this.paginaActual=resulttt;  }
      } }
       if (chekeo ==false){this.paginaActual=0;}
       this.actualizarItemsMostrados(); 
    }


  actualizarItemsMostrados() {
    const inicio = this.paginaActual * this.pageSize;
    this.turnos = this.ttBusca22.slice(inicio, inicio + this.pageSize);
    this.turnosBusca = this.ttBusca22.slice(inicio, inicio + this.pageSize);
    let maxx1=this.turnosBusca.length
       for (let i=0; i<maxx1; i++){    
       const resultado = this.arrayTurnos.find(turno => turno === this.turnosBusca[i]._id );
       if ( resultado){ 
          if( this.azulrojo == "azul"){   this.turnoSeleccionado = this.turnoSeleccionado === i ? -1 : i; }
            if( this.azulrojo == "rojo") {this.turnoRojo= this.turnoRojo === i ? -1 : i; }
  } } }
  


  paginaAnterior() {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.actualizarItemsMostrados();
    }
  }


  paginaSiguiente() {
    if ((this.paginaActual + 1) * this.pageSize < this.ttBusca22.length) {
      this.paginaActual++;
      this.actualizarItemsMostrados();
    }
  }

  
  limpiarSeleccion() {
    this.selectedRows=[];
    this.selectedRojo = [];
    this.turnoSeleccionado = -1; 
    this.turnoRojo -1;
    this.arrayTurnos= [];
    this.azulrojo="xx";
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  exportToExcel(): void {
    if (!this.table) {
      console.error('Tabla no inicializada correctamente.');
      return;
    }
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Turnos');
    const filename: string = 'Grupo_5_TablaTurnos.xlsx';
    XLSX.writeFile(wb, filename);
  }


  exportToPDF(): void {
    if (!this.table || !this.table.nativeElement) {
      console.error('Tabla no inicializada correctamente en exportToPDF.');
      return;
    }
    const doc = new jsPDF.default();
    const pdfTable = this.table.nativeElement;
    const options = {
      pagesplit: true // Permite la paginación automática
    };
    const htmlOptions = {
      scale: 2, // Escala de la imagen a capturar (ajusta según necesidades)
      useCORS: true // Permitir el uso de imágenes CORS
    };
    html2canvas(pdfTable, htmlOptions).then((canvas) => {
      // Obtenemos la imagen generada como base64
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = canvas.height * 210 / canvas.width; // Ajuste de la anchura de la imagen
      doc.addImage(imgData, 0, 0, 210, imgHeight); // 
      doc.save('Grupo_5_PySWEB_2024_TablaTurnos.pdf');
    });
  }


  exportPDFDiv(): void {
    const divToExport = document.getElementById('lastTurnoComprobante');
    if (!divToExport) {
      console.error('Div no encontrado en exportToPDF.');
      return;
    }
    const doc = new jsPDF.default();
    const htmlOptions = {
      scale: 2, // Escala de la imagen a capturar (ajusta según necesidades)
      useCORS: true // Permitir el uso de imágenes CORS
    };
    html2canvas(divToExport, htmlOptions).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = canvas.height * 210 / canvas.width; // Ajuste de la anchura de la imagen
      doc.addImage(imgData, 0, 0, 210, imgHeight); // Añadir imagen al documento PDF
      doc.save('documento.pdf');
    });
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // cargaPaciente
  cargaPaciente() {
    this.sPaciente.getPaciente().subscribe(
      (result: any) => {
        this.pacientes = new Array<Paciente>();
        this.listaPac = new Array<Paciente>();
        this.borradosPac = new Array<Paciente>();
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
          this.listaPac.push(this.paciente);
          this.borradosPac.push(this.paciente);
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
        this.listaMed = new Array<Medico>();
        this.borradosMed = new Array<Medico>();
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
          this.listaMed.push(this.medico);
          this.borradosMed.push(this.medico);
        }
      },
      (error: any) => { console.log(error); console.log("ERROR CARGA Medico"); }
    )
  }


 //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //carga Turno
  cargaTurno() {
    var ii = -1;
    this.sTurno.getTurno().subscribe(
      (result: any) => {
        this.turnos = new Array<Turno>();
        this.listaTurno = new Array<Turno>();
        this.ttBusca22 = new Array<Turno>();
        console.log("CARGA CORRECTA Turnos");
        let maxx = result.length; console.log("lenght:" + maxx);
        result.forEach((element: any) => {
          ii++;
          this.turno = new Turno();
          Object.assign(this.turno, element);
          this.turnos.push(this.turno);
          this.listaTurno.push(this.turno);
          this.ttBusca22.push(this.turno);   
        })
        this.bbuscarPPagina(this.idTurno); 
        this.actualizarItemsMostrados();
      })
  }


  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // busca turno por medico
  buscarTurnosPorMedico() {
    if (this.idMedico === "") { alert("...PRIMERO SELECCIONE UN MEDICO"); }
    else {
      let mediBBusca: Medico | undefined = this.listaMed.find(medico => medico._id === this.idMedico);

      if (mediBBusca) {

        //++++++++++++++++++++++++++++++++++++++++++++++++
        this.sTurno.getTurnoPorMedico(mediBBusca).subscribe(
          (result: any) => {
            this.turnos = new Array<Turno>();
            this.total = result.length; console.log("lenght:" + this.total);
            result.forEach((element: any) => {
              this.turno = new Turno();
              Object.assign(this.turno, element);
              this.turnos.push(this.turno);
            })
            if (this.total === 0) { alert("No se encontraron turnos para este medico"); }
            else {
              console.log("BUSQUEDA CORRECTA Turnos Por Medico");
              alert("TURNOS ENCONTRADOS con Medico::" + mediBBusca.apellido + "__" + mediBBusca.dni);
            }
          },
          (error: any) => { console.log(error); console.log("ERROR BUSCA Turnos Por Medico"); }
        )

      }
    }
  }


  //busca turno por paciente
  buscarTurnosPorPaciente() {
    if (this.idPaciente === "") { alert("...PRIMERO SELECCIONE UN PACIENTE"); }
    else {
      let paciBBusca: Paciente | undefined = this.listaPac.find(paciente => paciente._id === this.idPaciente);
      if (paciBBusca) {
        //++++++++++++++++++++++++++++++++++++++++++++++++
        this.sTurno.getTurnoPorPaciente(paciBBusca).subscribe(
          (result: any) => {
            this.turnos = new Array<Turno>();
            this.total = result.length; console.log("lenght:" + this.total);
            result.forEach((element: any) => {
              this.turno = new Turno();
              Object.assign(this.turno, element);
              this.turnos.push(this.turno);
            })
            if (this.total === 0) { alert("No se encontraron turnos para este Paciente"); }
            else {
              console.log("BUSQUEDA CORRECTA Turnos Por PACIENTE");
              alert("TURNOS_ENCONTRADOS con Paciente::" + paciBBusca.apellido + "__" + paciBBusca.dni);
            }
          },
          (error: any) => { console.log(error); console.log("ERROR BUSCA Turnos Por PACIENTE"); }
        )

      }
    }
  }


  //busca turno por medico y paciente
  buscarTurnosPorMedicoYPaciente() {
    if (this.idMedico === "" || this.idPaciente === "") {
      alert("...PRIMERO SELECCIONE UN MEDICO Y UN PACIENTE");
    }
    else {
      let paciBBusca: Paciente | undefined = this.listaPac.find(paciente => paciente._id === this.idPaciente);
      let mediBBusca: Medico | undefined = this.listaMed.find(medico => medico._id === this.idMedico);

      if (paciBBusca && mediBBusca) {
        //++++++++++++++++++++++++++++++++++++++++++++++++
        this.sTurno.getTurnoPorMedicoYPaciente(mediBBusca, paciBBusca).subscribe(
          (result: any) => {
            this.turnos = new Array<Turno>();
            this.total = result.length; console.log("lenght:" + this.total);
            result.forEach((element: any) => {
              this.turno = new Turno();
              Object.assign(this.turno, element);
              this.turnos.push(this.turno);
            })
            if (this.total === 0) { alert("No se encontraron turnos para este Paciente y MEDICO"); }
            else {
              console.log("BUSQUEDA CORRECTA Turnos Por PACIENTE y MEDICO");
              alert("Turnos_encontrados Paciente_DNI::"
                + paciBBusca.dni + "__MEDICO_DNI::" + mediBBusca.dni);
            }
          },
          (error: any) => { console.log(error); console.log("ERROR BUSCA Turnos Por PACIENTE y MEDICO"); }
        )


      } else { console.log("No Existe Paciente y Medico"); alert("NO EXISTE PACIENTE Y MEDICO CON ESOS ID"); }
    }
  }


  //busca turno por fechaturno
  buscarTurnosPorFechaTurno() {
    let fechaElegida = new Date(this.fecha);
    if (fechaElegida !== null && fechaElegida instanceof Date && !isNaN(fechaElegida.getTime()) && this.hhora > 6) {

      fechaElegida.setHours(this.hhora);
      fechaElegida.setMinutes(0); fechaElegida.setSeconds(0); fechaElegida.setMilliseconds(0);
      fechaElegida.setDate(fechaElegida.getDate() + 1);
      console.log("Fecha:" + fechaElegida);

      //++++++++++++++++++++++++++++++++++++++++++++++++
      this.sTurno.getTurnoPorFechaTurno(fechaElegida).subscribe(
        (result: any) => {
          this.turnos = new Array<Turno>();
          this.total = result.length; console.log("lenght:" + this.total);
          result.forEach((element: any) => {
            this.turno = new Turno();
            Object.assign(this.turno, element);
            this.turnos.push(this.turno);
          })
          if (this.total === 0) { alert("No se encontraron turnos con esa Fecha y hora "); }
          else { alert("SI se encontraron turnos con esa Fecha y hora "); }
        },
        (error: any) => { console.log(error); console.log("ERROR BUSCA Turnos Por FECHA Y HORA"); }
      )
    } else { alert("...PRIMERO SELECCIONE UNA FECHA Y HORA"); }
  }


  //busca turno por enfermedad
  buscarTurnosPorEnfermedad() {
    if (this.enfermedad !== "") {
      //++++++++++++++++++++++++++++++++++++++++++++++++
      this.sTurno.getTurnoPorEnfermedad(this.enfermedad.toLowerCase()).subscribe(
        (result: any) => {
          this.turnos = new Array<Turno>();
          this.total = result.length; console.log("lenght:" + this.total);
          result.forEach((element: any) => {
            this.turno = new Turno();
            Object.assign(this.turno, element);
            this.turnos.push(this.turno);
          })
          if (this.total === 0) { alert("No se encontraron turnos con esa enfermedad "); }
          else { alert("SI se encontraron turnos con esa enfermedad "); }
        },
        (error: any) => { console.log(error); console.log("ERROR BUSCA Turnos Por ENFERMEDAD"); }
      )
    } else { alert("...PRIMERO INGRESE UNA ENFERMEDAD"); }
  }


  //busca turno por sala
  buscarTurnosPorSala() {
    if (this.sala !== "") {
      //++++++++++++++++++++++++++++++++++++++++++++++++
      this.sTurno.getTurnoPorSala(this.sala.toLowerCase()).subscribe(
        (result: any) => {
          this.turnos = new Array<Turno>();
          this.total = result.length; console.log("lenght:" + this.total);
          result.forEach((element: any) => {
            this.turno = new Turno();
            Object.assign(this.turno, element);
            this.turnos.push(this.turno);
          })
          if (this.total === 0) { alert("No se encontraron turnos con esa SALA "); }
          else { alert("SI se encontraron turnos con esa SALA "); }
        },
        (error: any) => { console.log(error); console.log("ERROR BUSCA Turnos Por SALA"); }
      )
    } else { alert("...PRIMERO INGRESE UNA SALA"); }
  }


  //busca turno por pagado
  buscarTurnosPorPagado() {
    if (this.pagado) {
      //++++++++++++++++++++++++++++++++++++++++++++++++
      this.sTurno.getTurnoPorPagado(this.pagado).subscribe(
        (result: any) => {
          this.turnos = new Array<Turno>();
          this.total = result.length; console.log("lenght:" + this.total);
          result.forEach((element: any) => {
            this.turno = new Turno();
            Object.assign(this.turno, element);
            this.turnos.push(this.turno);
          })
          if (this.total === 0) { alert("No se encontraron turnos segun Pagado "); }
          else { alert("SI se encontraron turnos segun Pagado "); }
        },
        (error: any) => { console.log(error); console.log("ERROR BUSCA Turnos Por PAGADO"); }
      )
    } else { alert("...PRIMERO INGRESE SI EL TURNO ES PAGADO /TRUE/FALSE"); }
  }


  //busca turno por tipoPago
  buscarTurnosPorTipoPago() {
    if (this.tipoPago !== "") {
      //++++++++++++++++++++++++++++++++++++++++++++++++
      this.sTurno.getTurnoPorTipoPago(this.tipoPago).subscribe(
        (result: any) => {
          this.turnos = new Array<Turno>();
          this.total = result.length; console.log("lenght:" + this.total);
          result.forEach((element: any) => {
            this.turno = new Turno();
            Object.assign(this.turno, element);
            this.turnos.push(this.turno);
          })
          if (this.total === 0) { alert("No se encontraron turnos con ese tipo de pago "); }
          else { alert("SI se encontraron turnos con ese Tipo de Pago "); }
        },
        (error: any) => { console.log(error); console.log("ERROR BUSCA Turnos Por TIPO DE PAGO"); }
      )
    } else { alert("...PRIMERO INGRESE EL TIPO DE PAGO"); }
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



  buscaDatosMedico(med: Medico) {
    let idd = med.toString();
   /*  let max = this.listaMed.length;
    for (let i = 0; i < max; i++) {
      if (this.listaMed[i]._id == idd) {
        this.apel = this.listaMed[i].apellido + "_" + this.listaMed[i].nombre;
        this.docu = this.listaMed[i].dni;
    }}
    */
    let medBBusca22: Medico | undefined = this.listaMed.find(medico => medico._id === idd ); 
    if (medBBusca22) {
      this.apel = medBBusca22.apellido + "_" + medBBusca22.nombre;
      this.docu = medBBusca22.dni;
    }
    return this.apel;
  }


  buscaDatosPaciente(pacc: Paciente) {
    let idd2 = pacc.toString();
    /*  let max = this.listaPac.length;
      for (let i = 0; i < max; i++) {
        if (this.listaPac[i]._id == idd2) {
          this.apelPaciente = this.listaPac[i].apellido + "_" + this.listaPac[i].nombre;
          this.docuPaciente = this.listaPac[i].dni;
      }}
     */

    
    let pacBBusca22: Paciente | undefined = this.listaPac.find(paciente => paciente._id === idd2);
    if (pacBBusca22) {
      this.apelPaciente = pacBBusca22.apellido + "_" + pacBBusca22.nombre;
      this.docuPaciente = pacBBusca22.dni;
    }
    return this.apelPaciente;
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  selectTurno(index: number, iddT: string, pacc: Paciente, medi: Medico, fechaa: Date,
    salaa: String, enferr: String, pagadoo: boolean, precioo: Number, ttipo: String, esttado: String) {
    this.turnoSeleccionado = this.turnoSeleccionado === index ? -1 : index;
    let fechaElegida = new Date(fechaa);
    fechaElegida.setDate(fechaElegida.getDate() );
    fechaElegida.setHours(fechaElegida.getHours() ); 
    fechaElegida.setMinutes(0); fechaElegida.setSeconds(0); fechaElegida.setMilliseconds(0);

    let ApeMedico = this.buscaDatosMedico(medi);
    let ApePaciente = this.buscaDatosPaciente(pacc);
     this.cambiarFecha2(fechaElegida);
     this.hhora= fechaElegida.getHours();

    this.idTurno = iddT;
    this.idPaciente = pacc.toString();
    this.idMedico = medi.toString();
    this.sala = salaa.toString();
    this.enfermedad = enferr.toString();
    this.pagado = pagadoo;
    this.precio = precioo;
    this.tipoPago = ttipo.toString();
    this.estadoTurno = esttado.toString();
    this.cadID = iddT;
    this.cadInfo = "MEDICO DNI::" + this.docu + "......" + ApeMedico + ".........PACIENTE DNI::" + this.docuPaciente + "......" + ApePaciente;
    console.log("ID_TURNO:::" + iddT + "__DNI MEDICO::" + this.docu + "__DNI PACIENTE::" + this.docuPaciente);
    alert("ID_TURNO:::" + iddT + "__DNI MEDICO::" + this.docu + "__DNI PACIENTE::" + this.docuPaciente);
  }




  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  calculo1(): number {
    let suma: number = 0;
    let porcentaje: number = 0;
    let monto: number = Number(this.precio);
    if (this.tipoPago === "pami") { porcentaje = (30 * monto) / 100; suma = monto - porcentaje; }
    if (this.tipoPago === "osde") { porcentaje = (20 * monto) / 100; suma = monto - porcentaje; }
    if (this.tipoPago === "swiss_medical") { porcentaje = (15 * monto) / 100; suma = monto - porcentaje; }
    if (this.tipoPago === "instituto_de_seguro") { porcentaje = (25 * monto) / 100; suma = monto - porcentaje; }
    return suma;
  }


  control(paciente1: string, medico1: string, ffecha: Date, hhorario: number) {

    var bandera11 = false;
    var bandera22 = false;
    var bandera33 = false;
    var bandera44 = false;
    var encontrado: string = "";
    var resultado = false;
    var fechaArray = new Date();
    let fechaElegida = new Date();
    let Getfecha = new Date();
    let hhoy = new Date();
    let posicionxx=0;
    var HoraArray = 0;
    var HoraElegida = 0;
    var horaHoy = 0;

    if (this.idTurno == "" || this.idMedico == "" || this.idPaciente == "") {
      bandera44 = true;
      alert("...ALERTA SELECCIONE PRIMERO UN TURNO DE LA LISTA , MEDICO Y PACIENTE");
    }

    if (this.idTurno !== "" && this.idMedico !== "" && this.idPaciente !== "") {
      this.limpiarSeleccion();
      
      HoraElegida = this.hhora;
      fechaElegida = new Date(this.fecha);
      fechaElegida.setDate(fechaElegida.getDate() + 1);
      fechaElegida.setHours(this.hhora);
      fechaElegida.setMinutes(0); fechaElegida.setSeconds(0); fechaElegida.setMilliseconds(0);

      horaHoy = hhoy.getHours();
      if (fechaElegida.getTime() < hhoy.getTime()) { bandera33 = true; }
      if (fechaElegida.getTime() == hhoy.getTime() && HoraElegida < horaHoy) { bandera33 = true; }
      if (fechaElegida.getTime() > hhoy.getTime()) { bandera33 = false; }
      if (fechaElegida.getTime() == hhoy.getTime() && HoraElegida > horaHoy) { bandera33 = false; }

      if (bandera33) { alert("...ERROR LA FECHA Y HORA ELEGIDA SON MENOR A LA FECHA Y HORA ACTUAL DE HOY"); }

      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      let maxx = this.listaTurno.length; console.log("__idTurno::" + this.idTurno);
      console.log("__SELECT_PACIENTE::" + paciente1.toString()); console.log("__SELECT_MEDICO::" + medico1.toString());
      for (var i = 0; i < maxx; i++) {
        Getfecha = new Date(this.listaTurno[i].horaturno);
        HoraArray = Getfecha.getHours(); fechaArray = new Date(Getfecha);
        if (this.listaTurno[i]._id.toString() != this.idTurno.toString()
          && this.listaTurno[i].paciente.toString() == paciente1.toString()
          && fechaArray.getTime() == fechaElegida.getTime() && HoraArray == HoraElegida) {
          bandera11 = true;   this.azulrojo = "rojo";  
          this.arrayTurnos.push(this.listaTurno[i]._id.toString());        
          encontrado = "fila::" + posicionxx + "__ID TURNO::" + this.listaTurno[i]._id.toString()
            + "__Paciente::" + this.listaTurno[i].paciente.toString()
            + "__Medico::" + this.listaTurno[i].medico.toString();
          console.log(encontrado);
        }
      };

      if (bandera11) { alert("...ALERTA ESTE PACIENTE YA TIENE UN TURNO EN ESE MISMO HORARIO"); }
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      maxx = this.listaTurno.length;
      for (var i = 0; i < maxx; i++) {
        Getfecha = new Date(this.listaTurno[i].horaturno);
        HoraArray = Getfecha.getHours(); fechaArray = new Date(Getfecha);
        if (this.listaTurno[i]._id.toString() != this.idTurno.toString()
          && this.listaTurno[i].medico.toString() == medico1.toString()
          && fechaArray.getTime() == fechaElegida.getTime() && HoraArray == HoraElegida) {
          bandera22 = true;   this.azulrojo ="rojo";  
          this.arrayTurnos.push(this.listaTurno[i]._id.toString());
          encontrado = "fila::" + i + "__ID TURNO::" + this.listaTurno[i]._id.toString()
            + "__Paciente::" + this.listaTurno[i].paciente.toString()
            + "__Medico::" + this.listaTurno[i].medico.toString();
          console.log(encontrado);
        }
      };
      if (bandera22) { alert("...ERROR_ EL MEDICO ELEGIDO ESTA OCUPADO EN ESA FECHA Y HORARIO"); }
    }
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (bandera11 || bandera22 || bandera33 || bandera44) { resultado = true; }
    else { resultado = false; }
    return resultado;

  }


  modificaTurno() {
    let define = false;
    let fechaConvertida = new Date();
    this.selectedRows = new Array;
    let pprimero = false;

    if (this.sala == null) { pprimero = true; alert("...ALERTA PRIMERO INGRESE SALA"); }
    if (this.enfermedad == null) { pprimero = true; alert("...ALERTA PRIMERO INGRESE ENFERMEDAD"); }
    if (this.fecha == null) { pprimero = true; alert("...ALERTA PRIMERO INGRESE FECHA "); }
    if (this.hhora == null) { pprimero = true; alert("...ALERTA PRIMERO INGRESE HORA "); }
    if (this.idMedico == null) { pprimero = true; alert("...ALERTA PRIMERO ELIJA MEDICO "); }
    if (this.idPaciente == null) { pprimero = true; alert("...ALERTA PRIMERO ELIJA PACIENTE "); }
    if (this.precio == null) { pprimero = true; alert("...ALERTA PRIMERO ELIJA PRECIO "); }
    if (this.idTurno == null) { pprimero = true; alert("...ALERTA PRIMERO ELIJA TURNO "); }

    if (pprimero == false) {
      if (this.control(this.idPaciente, this.idMedico, this.fecha, this.hhora) == false) {
        this.limpiarSeleccion();
        let medBBusca: Medico | undefined = this.listaMed.find(medico => medico._id === this.idMedico);
        let pacBBusca: Paciente | undefined = this.listaPac.find(paciente => paciente._id === this.idPaciente);

        this.precio = this.calculo1();
        fechaConvertida = new Date(this.fecha);
        fechaConvertida.setDate(fechaConvertida.getDate() + 1);
        fechaConvertida.setHours(this.hhora);
        fechaConvertida.setMinutes(0);
        fechaConvertida.setSeconds(0);
        fechaConvertida.setMilliseconds(0);

        this.turnoAux = new Turno();
        this.turnoAux.fechaturno = fechaConvertida;
        this.turnoAux.horaturno = fechaConvertida;
        this.turnoAux.sala = this.sala.toLowerCase();
        this.turnoAux.pagado = this.pagado;
        if (pacBBusca) { this.turnoAux.paciente = pacBBusca; }
        if (medBBusca) { this.turnoAux.medico = medBBusca; }
        this.turnoAux.estado = this.estadoTurno.toLowerCase();
        this.turnoAux.enfermedad = this.enfermedad.toLowerCase();
        this.turnoAux.precio = this.precio;
        this.turnoAux.tipoPago = this.tipoPago;
        this.turnoAux._id = this.idTurno;

        // Llamamos al servicio para actualizar el turno
        this.sTurno.putTurno(this.turnoAux).subscribe(
          (result: any) => {
            define = true;   this.azulrojo="azul";
            this.arrayTurnos.push(this.idTurno); 
            this.cargaTurno();       
            this.mostrarLast();
            this.saberTitulo = "¡¡¡¡¡ULTIMO TURNO MODIFICADO!!!!!";
            console.log("MODIFICACION Correcta Turno"); alert("MODIFICACION_CORRECTA_TURNO");
          },
          (error: any) => { console.log(error); console.log("ERROR MODIFICACION Turno"); alert("ERROR_MODIFICACION_TURNO"); }
        )
      }
    }

  }



  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  borrarTurno() {
    let define = 0;
    if (this.idTurno != "") {
      if (confirm("Estas seguro de borrar el turno?")) {
        this.sTurno.deleteTurno(this.idTurno).subscribe(
          (result: any) => {
            define = 1; this.saberTitulo = "¡¡¡¡¡ULTIMO TURNO BORRADO!!!!!";
            console.log("BORRADO Correcto Turno"); alert("TURNO BORRADO CORRECTAMENTE");
          },
          (error: any) => {
            console.log(error); console.log("ERROR BORRADO Turno");
            alert("ERROR_BORRADO_TURNO");
          }
        )
      }
    } else { alert("...ERROR SELECCIONE UN TURNO DE LA LISTA"); }
    if (define == 1) {
      this.mostrarLast();
      this.cargaTurno();
    }
  }



  busquedaPaciente() {
    let bandera55 = false;
    let encontrado11 = false;
    let maxx = 0;
    var fechaArray2 = new Date();
    let fechaElegida2 = new Date();

    if (this.tipoBusca == 0 || this.tipoBusca == 1 || this.tipoBusca == 2 || this.tipoBusca == 3) {

      if (encontrado11 == false && this.tipoBusca == 0 && typeof this.dniBusca === 'number' && this.dniBusca > 0) {
        this.pacientes = new Array<Paciente>();
        let DNIElegido: string = this.dniBusca.toString();
        let DNIarray: string = "";
        maxx = this.listaPac.length;
        for (var i = 0; i < maxx; i++) {
          DNIarray = this.listaPac[i].dni.toString();
          if (DNIarray == DNIElegido || DNIarray.includes(DNIElegido.toString())) {
            console.log("paciente_ecnontrado");
            this.pacientes.push(this.listaPac[i]); encontrado11 = true;
          }
        }
        if (encontrado11) { alert("...PACIENTE ENCONTRADO CON ESE DNI"); }
      } else {
        if (encontrado11 == false && this.tipoBusca == 0) { alert("...NO EXISTE PACIENTE CON ESE DNI"); }
      }


      if (encontrado11 == false && this.tipoBusca == 1 && this.apellidoBusca != "") {
        this.pacientes = new Array<Paciente>();
        this.apellidoBusca = this.apellidoBusca.toLowerCase();
        let apeNom: String = "";
        maxx = this.listaPac.length;
        for (var i = 0; i < maxx; i++) {
          apeNom = this.listaPac[i].apellido + "," + this.listaPac[i].nombre;
          apeNom = apeNom.toString(); apeNom = apeNom.toLowerCase();
          if (apeNom == this.apellidoBusca || apeNom.includes(this.apellidoBusca)) {
            console.log("paciente_ecnontrado");
            this.pacientes.push(this.listaPac[i]); encontrado11 = true;
          }
        }
        if (encontrado11) { alert("...PACIENTE ENCONTRADO CON ESE APELLIDO"); }
      }
      else {
        if (encontrado11 == false && this.tipoBusca == 1) { alert("...NO EXISTE PACIENTE CON ESE APELLIDO"); }
      }

      if (encontrado11 == false && this.tipoBusca == 2 && this.fechaBusca != null) {
        fechaElegida2 = new Date(this.fechaBusca);
        fechaElegida2.setDate(fechaElegida2.getDate() + 1);
        fechaElegida2.setHours(8); fechaElegida2.setMinutes(0);
        fechaElegida2.setSeconds(0); fechaElegida2.setMilliseconds(0);
        this.pacientes = new Array<Paciente>();
        maxx = this.listaPac.length;
        for (var i = 0; i < maxx; i++) {
          fechaArray2 = new Date(this.listaPac[i].fechaingreso);
          if (fechaArray2.getTime() >= fechaElegida2.getTime()) {
            this.pacientes.push(this.listaPac[i]); encontrado11 = true; console.log("paciente_ecnontrado");
          }
        }
        if (encontrado11) { alert("...PACIENTE ENCONTRADO CON ESEA FECHA MINIMA"); }
      }
      else {
        if (encontrado11 == false && this.tipoBusca == 2) { alert("...NO EXISTE PACIENTE CON ESA FECHA MINIMA"); }
      }

      if (encontrado11 == false && this.tipoBusca == 3 && (this.fechaBusca != null && this.apellidoBusca != "")) {
        fechaElegida2 = new Date(this.fechaBusca);
        fechaElegida2.setDate(fechaElegida2.getDate() + 1);
        fechaElegida2.setHours(8); fechaElegida2.setMinutes(0);
        fechaElegida2.setSeconds(0); fechaElegida2.setMilliseconds(0);
        this.pacientes = new Array<Paciente>();
        this.apellidoBusca = this.apellidoBusca.toLowerCase();
        let apeNom2: String = "";
        maxx = this.listaPac.length;
        for (var i = 0; i < maxx; i++) {
          apeNom2 = this.listaPac[i].apellido + "," + this.listaPac[i].nombre;
          apeNom2 = apeNom2.toString(); apeNom2 = apeNom2.toLowerCase();
          fechaArray2 = new Date(this.listaPac[i].fechaingreso);
          if (fechaArray2.getTime() >= fechaElegida2.getTime()
            && (apeNom2 == this.apellidoBusca || apeNom2.includes(this.apellidoBusca))) {
            this.pacientes.push(this.listaPac[i]); encontrado11 = true; console.log("paciente_ecnontrado");
          }
        }
        if (encontrado11) { alert("...PACIENTE ENCONTRADO CON ESEA FECHA MINIMA Y APELLIDO"); }
      }
      else {
        if (encontrado11 == false && this.tipoBusca == 3) { alert("...NO EXISTE PACIENTE CON ESA FECHA MINIMA Y APELLIDO"); }
      }

    } else { alert("...SELECCIONE UN TIPO DE BUSQUEDA"); }

    if (encontrado11 == false) {
      this.cargaPaciente();
      alert("...NO EXISTE PACIENTE CON ESOS DATOS");
    }

  }


  busquedaMedico() {
    let bandera55 = false;
    let encontrado11 = false;
    let maxx = 0;
    var fechaArray2 = new Date();
    let fechaElegida2 = new Date();

    if (this.tipoBusca == 0 || this.tipoBusca == 1 || this.tipoBusca == 2 || this.tipoBusca == 3) {

      if (this.tipoBusca == 0 && typeof this.dniBusca === 'number' && this.dniBusca > 0) {
        this.medicos = new Array<Medico>();
        let DNIElegido2: string = this.dniBusca.toString();
        let DNIarray2: string = "";
        maxx = this.listaMed.length;
        for (var i = 0; i < maxx; i++) {
          DNIarray2 = this.listaMed[i].dni.toString();
          if (DNIarray2 == DNIElegido2 || DNIarray2.includes(DNIElegido2.toString())) {
            console.log("medico_encontrado");
            this.medicos.push(this.listaMed[i]); encontrado11 = true;
          }
        }
        if (encontrado11) { alert("...MEDICO ENCONTRADO CON ESE DNI"); }
      }
      else {
        if (encontrado11 == false && this.tipoBusca == 0) { alert("...NO EXISTE MEDICO CON ESE DNI"); }
      }

      if (this.tipoBusca == 1 && this.apellidoBusca != "") {
        this.medicos = new Array<Medico>();
        this.apellidoBusca = this.apellidoBusca.toLowerCase();
        let apeNom1: String = "";
        maxx = this.listaMed.length;
        for (var i = 0; i < maxx; i++) {
          apeNom1 = this.listaMed[i].apellido + "," + this.listaMed[i].nombre;
          apeNom1 = apeNom1.toString(); apeNom1 = apeNom1.toLowerCase();
          if (apeNom1 == this.apellidoBusca || apeNom1.includes(this.apellidoBusca)) {
            this.medicos.push(this.listaMed[i]);
            encontrado11 = true; console.log("medico_encontrado");
          }
        }
        if (encontrado11) { alert("...MEDICO ENCONTRADO CON ESE  APELIDO"); }
      }
      else {
        if (encontrado11 == false && this.tipoBusca == 1) { alert("...NO EXISTE MEDICO CON ESE APELLIDO"); }
      }

      if (this.tipoBusca == 2 && this.fechaBusca != null) {
        fechaElegida2 = new Date(this.fechaBusca);
        fechaElegida2.setDate(fechaElegida2.getDate() + 1);
        fechaElegida2.setHours(8); fechaElegida2.setMinutes(0);
        fechaElegida2.setSeconds(0); fechaElegida2.setMilliseconds(0);
        this.medicos = new Array<Medico>();
        maxx = this.listaMed.length;
        for (var i = 0; i < maxx; i++) {
          fechaArray2 = new Date(this.listaMed[i].fechaingreso);
          if (fechaArray2.getTime() >= fechaElegida2.getTime()) {
            this.medicos.push(this.listaMed[i]); encontrado11 = true;
          }
        }
        if (encontrado11) { alert("...MEDICO ENCONTRADO CON ESA FECHA MINIMA "); }
      }
      else {
        if (encontrado11 == false && this.tipoBusca == 2) { alert("...NO EXISTE MEDICO CON ESA FECHA MINIMA "); }
      }

      if (this.tipoBusca == 3 && (this.fechaBusca != null && this.apellidoBusca != "")) {
        fechaElegida2 = new Date(this.fechaBusca);
        fechaElegida2.setDate(fechaElegida2.getDate() + 1);
        fechaElegida2.setHours(8); fechaElegida2.setMinutes(0);
        fechaElegida2.setSeconds(0); fechaElegida2.setMilliseconds(0);
        this.medicos = new Array<Medico>();
        this.apellidoBusca = this.apellidoBusca.toLowerCase();
        let apeNom2: String = "";
        maxx = this.listaMed.length;
        for (var i = 0; i < maxx; i++) {
          apeNom2 = this.listaMed[i].apellido + "," + this.listaMed[i].nombre;
          apeNom2 = apeNom2.toString(); apeNom2 = apeNom2.toLowerCase();
          fechaArray2 = new Date(this.listaMed[i].fechaingreso);
          if (fechaArray2.getTime() >= fechaElegida2.getTime()
            && (apeNom2 == this.apellidoBusca || apeNom2.includes(this.apellidoBusca))) {
            this.medicos.push(this.listaMed[i]);
            encontrado11 = true; console.log("medico_encontrado");
          }
        }
        if (encontrado11) { alert("...MEDICO ENCONTRADO CON ESEA FECHA MINIMA Y APELLIDO"); }
      }
      else {
        if (encontrado11 == false && this.tipoBusca == 3) { alert("...NO EXISTE MEDICO CON ESA FECHA MINIMA Y APELLIDO"); }
      }
    } else { alert("...SELECCIONE UN TIPO DE BUSQUEDA"); }

    if (encontrado11 == false) { this.cargaMedico(); }

  }


  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  mostrarLast() {
    let convertt = new Date;
    this.MuestraTurno = new Turno();
    this.MuestraTurno = this.listaTurno.find(turno => turno._id === this.idTurno);
    if (this.MuestraTurno) {
      convertt = new Date(this.MuestraTurno.fechaturno);
      let dd = convertt.getDate();
      let mm = convertt.getMonth();
      let yyyy = convertt.getFullYear();
      let hhhora = convertt.getHours();
      let minuto = convertt.getMinutes();
      let fffecha = dd + '/' + mm + '/' + yyyy + "__" + hhhora + ':' + minuto;

      this.paciBBusca = this.listaPac.find(paciente => paciente._id === this.idPaciente);
      this.mediBBusca = this.listaMed.find(medico => medico._id === this.idMedico);
      if (this.mediBBusca && this.paciBBusca) {
        this.lastfila = "MEDICO_DNI::" + this.mediBBusca.dni + "____NOMBRE:::" + this.mediBBusca.apellido + ", " + this.mediBBusca.nombre + "\r\n" +
          "PACIENTE_DNI::" + this.paciBBusca.dni + "____NOMBRE:::" + this.paciBBusca.apellido + ", " + this.paciBBusca.nombre + "\r\n" +
          "FECHA::" + fffecha + "\r\n" +
          "ENFERMEDAD::" + this.MuestraTurno.enfermedad + "\r\n" +
          "SALA::" + this.MuestraTurno.sala + "\r\n" +
          "TIPO_PAGO::" + this.MuestraTurno.tipoPago + "\r\n" +
          "PRECIO::" + this.MuestraTurno.precio + "\r\n" +
          "PAGADO::" + this.MuestraTurno.pagado + "\r\n" +
          "ESTADO::" + this.MuestraTurno.estado;
      }
    }
  }



  ttiposBusqueda() {
    if (this.BuscaTTurno == 0 || this.BuscaTTurno == 1 || this.BuscaTTurno == 2
      || this.BuscaTTurno == 3 || this.BuscaTTurno == 4 || this.BuscaTTurno == 5 || this.BuscaTTurno == 6) {
      if (this.BuscaTTurno == 0) { this.buscarTurnosPorMedico(); }
      if (this.BuscaTTurno == 1) { this.buscarTurnosPorPaciente(); }
      if (this.BuscaTTurno == 2) { this.buscarTurnosPorMedicoYPaciente(); }
      if (this.BuscaTTurno == 3) { this.buscarTurnosPorFechaTurno(); }
      if (this.BuscaTTurno == 4) { this.buscarTurnosPorEnfermedad(); }
      if (this.BuscaTTurno == 5) { this.buscarTurnosPorSala(); }
      if (this.BuscaTTurno == 6) { this.buscarTurnosPorTipoPago(); }
      this.ttBusca22=this.turnos;
      this.actualizarItemsMostrados();
    } else {
      console.log("entro en else_tipo_Busqueda");
      alert("PRIMERO SELECCIONE TIPO BUSQUEDA PARA TURNO ");
    }
  }











  








}
