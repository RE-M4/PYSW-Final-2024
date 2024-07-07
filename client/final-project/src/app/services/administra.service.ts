import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administra } from '../models/administra';

@Injectable({
  providedIn: 'root'
})
export class AdministraService {

  constructor(private _http: HttpClient) { }

  //CRUD

   //obtener todos los administrativos
  getAdmins(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this._http.get('http://localhost:3000/finalg5/administrativo', httpOptions);
  };

  //obtener admin por dni
  getAdminDni(dni: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this._http.get('http://localhost:3000/finalg5/administrativo/' + dni, httpOptions);
  };

  //crear admin
  createAdmin(admin: Administra): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(admin); //pasar a JSON el objeto
    return this._http.post('http://localhost:3000/finalg5/administrativo', body, httpOptions);
  };

  //editar admin
  updateAdmin(admin: Administra): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(admin); //pasar a JSON el objeto
    return this._http.put('http://localhost:3000/finalg5/administrativo/' + admin._id, body, httpOptions);
  };

  //eliminar admin
  deleteAdmin(id: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this._http.delete('http://localhost:3000/finalg5/administrativo/' + id, httpOptions);
  };

}
