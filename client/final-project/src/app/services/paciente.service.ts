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

  public getPacienteByDni(dni: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this._http.get('http://localhost:3000/finalg5/paciente/buscar/' + dni, httpOptions);
  };

  public login(dni: Number, password: String): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    let body = JSON.stringify({dni: dni, password: password});

    return this._http.post('http://localhost:3000/finalg5/paciente/login', body, httpOptions);
  }

  public logout() {
    //borro el vble almacenado mediante el storage
    sessionStorage.removeItem("dni");
    sessionStorage.removeItem("id");
  }

  public userLoggedIn(){
      var resultado = false;
      var paciente = sessionStorage.getItem("dni");
      if(paciente!=null){
      resultado = true;
      }
      return resultado;
  }
  public userLogged(){
    var paciente = sessionStorage.getItem("dni");
    return paciente;
  }
  public idLogged(){
    var id = sessionStorage.getItem("id");
    return id;
  }
}
