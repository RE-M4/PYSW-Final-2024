import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public postPaciente(pac: Paciente): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
      let body:any = JSON.stringify(pac);
    return this._http.post('http://localhost:3000/finalg5/paciente', body, httpOptions);
  }

/*
//busca paciente por dni
  public getPacienteByDNI(dni: Number): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/paciente/dni/' + dni, httpOptions);
  }


//busca paciente por id
  public getPacienteById(id: String): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/paciente/id/' + id, httpOptions);
  }


//busca por apellido
  public getPacienteByApellido(apellido: String): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/paciente/apellido/' + apellido, httpOptions);
  }

//busca por domicilio
  public getPacienteByDomicilio(domicilio: String): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/paciente/domicilio/' + domicilio, httpOptions);
  }


// put Paciente
  public putPaciente(pac: Paciente): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    let body:any = JSON.stringify(pac);
    return this._http.put('http://localhost:3000/finalg5/paciente/id/' + pac._id, body, httpOptions);
  }


//borra un paciente
  public deletePaciente(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    return this._http.delete('http://localhost:3000/finalg5/paciente/id/' + id, httpOptions);
  }


  //busca por apellido y domicilio
  public getPacienteByApellidoAndDomicilio(apellido: String, domicilio: String): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/paciente/apellido/' + apellido + '/domicilio/' + domicilio, httpOptions);
  }


  
  */
}
