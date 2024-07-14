import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule,RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Paciente } from '../../models/paciente';
import { Medico } from '../../models/medico';
import { Turno } from '../../models/turno';
import { MedicoService } from '../../services/medico.service';
import { PacienteService } from '../../services/paciente.service';
import { TurnoService } from '../../services/turno.service';
import { elementAt } from 'rxjs';
//import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import 'datatables.net-buttons-dt';
declare var $: any;
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
//import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-turnos-altas',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './turnos-altas.component.html',
  styleUrl: './turnos-altas.component.css'
})


export class TurnosAltasComponent implements OnInit {

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
  ttBusca22 !: Array<Turno>;
  filaSeleccionada: number | null;
  filaEncontrada: number | null;
  preferenceId!: String;
  showPaymentButton: Boolean = false;

  apel!: String; ddni!: String; docu!: Number; idMedico!: string; idTurno!: string; ordenMedico!: number;
  apelPaciente!: String; docuPaciente!: Number; idPaciente!: string; ordenPaciente!: number; cadID = "";
  fecha:Date =new Date(); fechaMinima = new Date(); selectFecha = new Date(); sala!: string; pagado: boolean = true; saberTitulo = "__";
  estadoTurno: string = "vigente"; enfermedad!: string; tipoPago: string = "pami"; precio: Number = 1; hhora = 8; cadInfo = "";

  dniBusca!: Number; apellidoBusca!: string; fechaBusca!: Date; fechaMaxima = new Date(); tipoBusca!: number;
  apMedico!: String; dniMedico!: Number; apPaciente!: String; dniPaciente!: Number; lastfila = "__";
  paginaActual: number; pageSize: number; BuscaTTurno!: number; total!: number;
  turnoSeleccionado: number = -1; turnoRojo: number = -1; selectedRows: number[] = []; selectedRojo: number[] = [];


  constructor(  private router: Router,
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
  }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  ngOnInit(): void {
    this.cargaMedico();
    this.cargaPaciente();
    this.cargaTurno();
    this.actualizarItemsMostrados();
    this.cargarLastTurno();
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


  iraModifica():void{
     this.router.navigateByUrl('/modibajaturnos');
  }
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    actualizarItemsMostrados() {
      const inicio = this.paginaActual * this.pageSize;
      this.turnos = this.ttBusca22.slice(inicio, inicio + this.pageSize);
      this.turnosBusca = this.ttBusca22.slice(inicio, inicio + this.pageSize);
     // this.marcameFila();
      
  }

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

  marcameFila(yydd: string) {
    const index = this.ttBusca22.findIndex(item => item._id === yydd);
    if (index !== -1) {
      this.filaSeleccionada = index;
      //this.paginaActual = Math.floor(index / this.pageSize);
      //this.actualizarItemsMostrados();
    } else {
      console.log('Elemento no encontrado en la tabla.');
    }
  }

  buscarYMarcarFila(yydd: string) {
    const index = this.ttBusca22.findIndex(item => item._id === yydd);
    if (index !== -1) {
      this.filaSeleccionada = index;
      this.paginaActual = Math.floor(index / this.pageSize);
      this.actualizarItemsMostrados();
    } else {
      console.log('Elemento no encontrado en la tabla.');
    }
  }

  encontrarFila(yydd: string) {
    const index = this.ttBusca22.findIndex(item => item._id === yydd);
    if (index !== -1) {
      this.filaEncontrada = index;
      this.filaSeleccionada = null;
      this.paginaActual = Math.floor(index / this.pageSize);
      this.actualizarItemsMostrados();
    } else {
      console.log('Elemento no encontrado en la tabla.');
    }

  }

  limpiarSeleccion() {
    this.filaSeleccionada = null;
    this.filaEncontrada = null;
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
          if (this.listaTurno[ii]._id == this.idTurno) {
            console.log("Turno_encontrado_en_carga");
            this.selectedRows.push(ii); this.turnoSeleccionado = this.turnoSeleccionado === ii ? -1 : ii;
          }
        })
        this.actualizarItemsMostrados();
      }
    )
  }




  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



  buscaDatosMedico(med: Medico) {
    let idd = med.toString();
    let max = this.listaMed.length;
    for (let i = 0; i < max; i++) {
      if (this.listaMed[i]._id == idd) {
        this.apel = this.listaMed[i].apellido + "_" + this.listaMed[i].nombre;
        this.docu = this.listaMed[i].dni;
      }
    }
    return this.apel;
  }


  buscaDatosPaciente(pacc: Paciente) {
    let idd2 = pacc.toString();
    let max = this.listaPac.length;
    for (let i = 0; i < max; i++) {
      if (this.listaPac[i]._id == idd2) {
        this.apelPaciente = this.listaPac[i].apellido + "_" + this.listaPac[i].nombre;
        this.docuPaciente = this.listaPac[i].dni;
      }
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
  }



  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  buscaMedico() {
    this.sMedico.getMedico().subscribe(
      (result: any) => {
        let maxx = result.length;
        this.medicoAux = new Medico();
        for (var i = 0; i < maxx; i++) {
          if (result[i]._id == this.idMedico) {
            this.ordenMedico = i;
            console.log("Medico::" + result[i]._id + "__" + result[i].dni + "__" + this.ordenMedico);
            this.medicoAux._id = result[i]._id;
            this.medicoAux.apellido = result[i].apellido;
            this.medicoAux.nombre = result[i].nombre;
            this.medicoAux.dni = result[i].dni;
            this.medicoAux.matricula = result[i].matricula;
            this.medicoAux.domicilio = result[i].domicilio;
            this.medicoAux.contactos = result[i].contactos;
          }
        }
      },
      (error: any) => { console.log(error); console.log("_error_busca_medico "); }
    )
  }


  buscaPaciente() {
    this.sPaciente.getPaciente().subscribe(
      (result: any) => {
        this.pacienteAux = new Paciente();
        let maxx = result.length;
        for (var i = 0; i < maxx; i++) {
          if (result[i]._id == this.idPaciente) {
            this.ordenPaciente = i;
            console.log("Paciente::" + result[i]._id + "__" + result[i].dni + "__" + this.ordenPaciente);
            this.pacienteAux._id = result[i]._id;
            this.pacienteAux.apellido = result[i].apellido;
            this.pacienteAux.nombre = result[i].nombre;
            this.pacienteAux.dni = result[i].dni;
            this.pacienteAux.domicilio = result[i].domicilio;
            this.pacienteAux.contactos = result[i].contactos;
            this.pacienteAux.historia = result[i].historia;
          }
        }
      },
      (error: any) => { console.log(error); console.log("_error_busca_paciente "); }
    )
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
    var HoraArray = 0;
    var HoraElegida = 0;
    var horaHoy = 0;

    if (this.idMedico == "" || this.idPaciente == "") {
      bandera44 = true;
      alert("...ALERTA PRIMERO SELECCIONE MEDICO Y PACIENTE");
    }

    if (this.idMedico !== "" && this.idPaciente !== "") {
      this.turnoSeleccionado= -1; this.turnoRojo = -1;  this.selectedRows=[]=[]; this.selectedRojo=[] = [];
      HoraElegida = this.hhora;
      fechaElegida = new Date(this.fecha);
      fechaElegida.setDate(fechaElegida.getDate() + 1);
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
        if (this.listaTurno[i].paciente.toString() == paciente1.toString()
          && fechaArray.getTime() == fechaElegida.getTime() && HoraArray == HoraElegida) {
          bandera11 = true;  this.selectedRojo.push(i); this.turnoRojo = this.turnoRojo === i ? -1 : i;
          encontrado = "fila::" + i + "__ID TURNO::" + this.listaTurno[i]._id.toString()
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
        if (this.listaTurno[i].medico.toString() == medico1.toString()
          && fechaArray.getTime() == fechaElegida.getTime() && HoraArray == HoraElegida) {
          bandera22 = true; this.selectedRojo.push(i); this.turnoRojo = this.turnoRojo === i ? -1 : i;
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


  AlttaTurno() {
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

    if (pprimero == false) {
      if (this.control(this.idPaciente, this.idMedico, this.fecha, this.hhora) == false) {

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

        // Llamamos al servicio para actualizar el turno
        this.sTurno.postTurno(this.turnoAux).subscribe(
          (result: any) => {
            this.turnoSeleccionado= -1; this.turnoRojo = -1;  this.selectedRows=[]=[]; this.selectedRojo=[] = [];
            this.MuestraTurno = new Turno(); this.MuestraTurno = this.turnoAux;
            this.paciBBusca = new Paciente(); this.paciBBusca = pacBBusca;
            this.mediBBusca = new Medico(); this.mediBBusca = medBBusca;
            this.makePayment(this.turnoAux);
            this.LastTurno();
            this.cargaTurno();
            this.mostrarLast();
            this.saberTitulo = "¡¡¡¡¡ULTIMO TURNO DE ALTA!!!!!";
            console.log("ALTA Correcta Turno"); alert("ALTA_CORRECTA_TURNO");
          },
          (error: any) => { console.log(error); console.log("ERROR ALTA Turno"); alert("ERROR_ALTA_TURNO"); }
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
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  mostrarLast() {
    let convertt = new Date;

    if (this.MuestraTurno && this.paciBBusca && this.mediBBusca) {
      convertt = new Date(this.MuestraTurno.fechaturno);
      let dd = convertt.getDate();
      let mm = convertt.getMonth();
      let yyyy = convertt.getFullYear();
      let hhhora = convertt.getHours();
      let minuto = convertt.getMinutes();
      let fffecha = dd + '/' + mm + '/' + yyyy + "__" + hhhora + ':' + minuto;

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




  mostrarAll() {
    var ii = -1;
    let maxx = 0;
    this.sTurno.getAllTurno().subscribe(
      (result: any) => {
        this.turnos = new Array<Turno>();
        this.listaTurno = new Array<Turno>();
        this.ttBusca22 = new Array<Turno>();
        maxx = result.length; console.log("lenght:" + maxx);
        result.forEach((element: any) => {
          ii++;
          this.turno = new Turno();
          Object.assign(this.turno, element);
          this.turnos.push(this.turno);
          this.listaTurno.push(this.turno);
          this.ttBusca22.push(this.turno);
        })
        console.log("CARGA CORRECTA Turnos,desordenada");
      }
    )
  }


  LastTurno() {
    var ii = -1;
    let maxx = 0;
    this.sTurno.getLastTurno().subscribe(
      (result: any) => {
        this.ttBusca22 = new Array<Turno>();
        maxx = result.length; console.log("lenght:" + maxx);
        ii++;
        this.turno = new Turno();
        Object.assign(this.turno, result);
        this.ttBusca22.push(this.turno);
        this.idTurno = this.turno._id.toString();
        console.log("Ultimo_turno ID:::" + this.turno._id.toString());
        console.log("FECHA:::" + this.turno.fechaturno);
        console.log("ENFERMEDAD:::" + this.turno.enfermedad);
        console.log("SALA::" + this.turno.sala);
        console.log("Ultimo_Turno_Correcto");
      }
    )
  }


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



  ttiposBusqueda() {
    if (this.BuscaTTurno == 0 || this.BuscaTTurno == 1  || this.BuscaTTurno == 2 || this.BuscaTTurno == 3 ) {
      if (this.BuscaTTurno == 0) { this.buscarTurnosPorMedico(); }
      if (this.BuscaTTurno == 1) { this.buscarTurnosPorPaciente(); }
      if (this.BuscaTTurno == 2) { this.buscarTurnosPorMedicoYPaciente(); }
      if (this.BuscaTTurno == 3) { this.buscarTurnosPorFechaTurno(); }
   
      this.ttBusca22=this.turnos;
      this.actualizarItemsMostrados();
    } else {
      console.log("entro en else_tipo_Busqueda");
      alert("PRIMERO SELECCIONE TIPO BUSQUEDA PARA TURNO ");
    }
  }

  makePayment(turno: Turno){
    this.sTurno.makePayment(turno).subscribe(
      (data:any) => {
        console.log(data);
        this.preferenceId = data.init_point;
        console.log(this.preferenceId);
            
        this.showPaymentButton = true;
      },
      (err:any) => {
        console.log(err);
      }
    )
  }


}

