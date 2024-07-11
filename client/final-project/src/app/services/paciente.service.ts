import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private _http: HttpClient) { }


  public getPaciente(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/paciente',httpOptions);

  }
  public getPacienteById(id:string):Observable<any>{
    let httpOption={
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    }
    return this._http.get('http://localhost:3000/finalg5/paciente/'+id,httpOption);
  }

  public addPaciente(paciente:Paciente):Observable<any>{
    let httpOptions={
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    let body:any = JSON.stringify(paciente)
    return this._http.post('http://localhost:3000/finalg5/paciente',body,httpOptions);
  }



  public update(paciente:Paciente):Observable<any>{
    let httpOption={
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      }),
    }
    let body:any = JSON.stringify(paciente);
    return this._http.put('http://localhost:3000/finalg5/paciente/'+paciente._id,body,httpOption);
  }
  public delete(paciente:Paciente):Observable<any>{
    let httpOption={
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    }
    return this._http.delete('http://localhost:3000/finalg5/paciente/'+paciente._id,httpOption);
  }
}
