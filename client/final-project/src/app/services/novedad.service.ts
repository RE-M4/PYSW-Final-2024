import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Novedades } from '../models/novedades';


@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  constructor(private _http: HttpClient) { }


  //CRUD

    //obtener todas las novedades
    getNovedades(): Observable<any> {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      return this._http.get('http://localhost:3000/finalg5/novedades', httpOptions);
    }

   // Obtener novedades por estado "pendiente" o "procesado"
    getNovedadesEstado(estado: any): Observable<any> {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      return this._http.get('http://localhost:3000/finalg5/novedades/estado/' + estado, httpOptions);
    }

    // Obtener novedad por ID
    getNovedadId(id: any): Observable<any> {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      return this._http.get('http://localhost:3000/finalg5/novedades/' + id, httpOptions);

      
    }
    //filtrar novedad por tipo
    getNovedadesByTipo(tipo: any): Observable<any> {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      return this._http.get('http://localhost:3000/finalg5/novedades/' + tipo, httpOptions);
    }

    //crear novedad
    createNovedad(novedad: Novedades): Observable<any> {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      let body = JSON.stringify(novedad); //pasar a JSON el objeto
      console.log(body);
      return this._http.post('http://localhost:3000/finalg5/novedades', body, httpOptions);
    }

    //editar novedad
    updateNovedad(novedad: Novedades): Observable<any> {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      let body = JSON.stringify(novedad); //pasar a JSON el objeto
      return this._http.put('http://localhost:3000/finalg5/novedades/' + novedad._id, body, httpOptions);
    }

    //eliminar novedad
    deleteNovedad(id: any): Observable<any> {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      return this._http.delete('http://localhost:3000/finalg5/novedades/' + id, httpOptions);
    }

   
}
