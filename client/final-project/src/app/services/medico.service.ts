import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private _http: HttpClient) { }


  public getMedico(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/medico',httpOptions);

  }

  public postMedico(med: Medico): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
         
      let body:any = JSON.stringify(med);
    
    return this._http.post('http://localhost:3000/finalg5/medico', body, httpOptions);
  }
}
