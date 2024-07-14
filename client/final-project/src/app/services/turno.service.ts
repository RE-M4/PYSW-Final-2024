import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from '../models/turno';
import { Medico } from '../models/medico';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private _http: HttpClient) { }
         
  makePayment(turno: Turno): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer APP_USR-4000912111218835-070815-58cdf8fecb6194e9a08ee0a011e8bd25-1890303345'
      })
    }

    let body = {
      items: [
        {
          title: "Turno para el doctor" + turno.medico.apellido,
          quantity: 1,
          unit_price: turno.precio
        }
      ],
    }
    return this._http.post('https://api.mercadopago.com/checkout/preferences', body, httpOptions);
  }
     

  public updateVVigencia(turnos: Array<Turno>): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    let body:any = JSON.stringify(turnos);
    return this._http.put('http://localhost:3000/finalg5/turno/vigencia', body, httpOptions);
  }

     //buscar por turnos estado
     public buscarTurnosPorEstado(estado: string): Observable<any> {
       let httpOptions = {
         headers: new HttpHeaders({
           'Content-Type': 'application/json' 
         }),
       }
       return this._http.get('http://localhost:3000/finalg5/turno/estado/'+estado, httpOptions);
     }
    

  public deleteMany(turnos: Array<Turno>): Observable<any> {
    const ids = turnos.map(turno => turno._id);
    const url = `http://localhost:3000/finalg5/turno/deletemany`;
    return this._http.delete(url, { body: ids });
  }
 
  public updateEstadoCancelado(turnos: Array<Turno>): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    let body:any = JSON.stringify(turnos);
    return this._http.put('http://localhost:3000/finalg5/turno/uppdate', body, httpOptions);
  }

  public getLastTurno(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/turno/last',httpOptions);
  }

  public getAllTurno(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/turno/all',httpOptions);
  }

  public getTurno(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/turno',httpOptions);
  }


  public postTurno(turno: Turno): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
      let body:any = JSON.stringify(turno);
    return this._http.post('http://localhost:3000/finalg5/turno', body, httpOptions);
  }


  //busca turno por medico
  public getTurnoPorMedico(medico: Medico): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/turno/id_medico/'+medico._id,httpOptions);
  }


//busca turno por paciente
  public getTurnoPorPaciente(paciente: Paciente): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/turno/id_paciente/'+paciente._id,httpOptions);
  }


//busca turno por medico y paciente
  public getTurnoPorMedicoYPaciente(medico: Medico, paciente: Paciente): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/turno/medico/'+medico._id+'/paciente/'+paciente._id,httpOptions);
  }


//busca turno por fechaturno
  public getTurnoPorFechaTurno(fechaturno: Date): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/turno/fechaturno/'+fechaturno,httpOptions);
  }
  

//busca turno por sala
  public getTurnoPorSala(sala: String): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/turno/sala/'+sala,httpOptions);
  }

  
//busca turno por enfermedad
  public getTurnoPorEnfermedad(enfermedad: String): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/turno/enfermedad/'+enfermedad,httpOptions);
  }


//busca turno por tipoPago
  public getTurnoPorTipoPago(tipoPago: String): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/turno/tipoPago/'+tipoPago,httpOptions);
  }


//busca turno por pagado
  public getTurnoPorPagado(pagado: boolean): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/turno/pagado/'+pagado,httpOptions);
  }


  public putTurno(turno: Turno): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }     
      let body:any = JSON.stringify(turno);
    return this._http.put('http://localhost:3000/finalg5/turno/id/'+turno._id, body, httpOptions);
  }


// borrar turno
  public deleteTurno(idd: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    return this._http.delete('http://localhost:3000/finalg5/turno/id/'+idd, httpOptions);
  }

  public getTurnoPaciente(id:string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/turno/id_paciente/'+id,httpOptions);
  }
    
  public getTurnoMedico(id:string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/turno/id_medico/'+id,httpOptions);
  }
   
}
