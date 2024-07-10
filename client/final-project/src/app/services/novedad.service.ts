import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Novedades } from '../models/novedades';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  constructor(private _http: HttpClient) { }


  public getNovedades(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
    return this._http.get('http://localhost:3000/finalg5/novedades',httpOptions);

  }

  public postNovedades(nove: Novedades): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      }),
    }
         
      let body:any = JSON.stringify(nove);
    
    return this._http.post('http://localhost:3000/finalg5/novedades', body, httpOptions);
  }





















  
}
