import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Contacto } from '../models/contacto';



@Injectable({
  providedIn: 'root'
})


export class ContactoService {

  constructor(private _http: HttpClient) { }


  public getContacto(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/contacto',httpOptions);

  }

  public postContacto(cont: Contacto): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
         
      let body:any = JSON.stringify(cont);
    
    return this._http.post('http://localhost:3000/finalg5/contacto', body, httpOptions);
  }




}
