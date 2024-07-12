import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private _http: HttpClient) { }


  //Obtener todos los medicos
  public getMedico(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/medico', httpOptions);

  }

  //Agregar un nuevo medico
  public postMedico(med: Medico): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    //Convierte el objeto en formato JSON
    let body: any = JSON.stringify(med);

    return this._http.post('http://localhost:3000/finalg5/medico', body, httpOptions);
  }


  //Obtener medico por id
  public getMedicoById(id: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this._http.get('http://localhost:3000/finalg5/medico/' + id, httpOptions);
  }

  //Obtener medico por dni
  public getMedicoByDni(dni: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this._http.get('http://localhost:3000/finalg5/medico/buscar/' + dni, httpOptions);
  };

  //Editar medico por id, convierte el objeto en formato JSON
  public editMedico(id: any, data: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this._http.put('http://localhost:3000/finalg5/medico/' + id, JSON.stringify(data), httpOptions);
  }

  //Eliminar medico por id
  public deleteMedico(id: any):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this._http.delete('http://localhost:3000/finalg5/medico/' + id, httpOptions);
  }

  public getMedicoByEspecialidad(especialidad: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this._http.get('http://localhost:3000/finalg5/medico/especialidad/' + especialidad, httpOptions);
  }

  getMedicoByNombreApellido(nombreapellido: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this._http.get('http://localhost:3000/finalg5/medico/nombreapellido/' + nombreapellido, httpOptions);
  }
}
