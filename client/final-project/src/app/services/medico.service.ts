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


//busca por id
  public getMedicoById(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/medico/id/'+id,httpOptions);
  }


//busca por dni
  public getMedicoByDni(dni: number): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/medico/dni/'+dni,httpOptions);
  }


  //busca por matricula
  public getMedicoByMatricula(mat: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/medico/matricula/'+mat,httpOptions);
  }
    
//busca por especialidad
  public getMedicoByEspecialidad(esp: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/medico/especialidad/'+esp,httpOptions);
  }

//busca por apellido  y especialidad
  public getMedicoByApellidoEspecialidad(apellido: string, esp: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/medico/apellido/'+apellido+'/especialidad/'+esp,httpOptions);
  }

  // put Medico por id
  public putMedico(id: string, med: Medico): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
      let body:any = JSON.stringify(med);
    return this._http.put('http://localhost:3000/finalg5/medico/id/'+id, body, httpOptions);
  }
 
// borra un medico
  public deleteMedico(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.delete('http://localhost:3000/finalg5/medico/id/'+id, httpOptions);
  }








}
