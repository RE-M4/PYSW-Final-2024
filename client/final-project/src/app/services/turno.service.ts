import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from '../models/turno';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private _http: HttpClient) { }


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








  





}
