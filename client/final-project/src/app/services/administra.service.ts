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
         
     // let body:any = JSON.stringify(adminn);
    
    return this._http.get('http://localhost:3000/finalg5/admin/dni/'+dni,  httpOptions);
  }


















  
}
