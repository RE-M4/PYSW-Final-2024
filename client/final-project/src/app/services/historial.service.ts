import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historial } from '../models/historial';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(private _http: HttpClient) { }

  public getHistoriales(filter?: any): Observable<any> {
    let params = new HttpParams();
    if (filter !== undefined) {
      params = params.append('filter', filter);
    }

    let httpOptions = {
      headers: new HttpHeaders({
      }),
      params: params
    };

    return this._http.get('http://localhost:3000/finalg5/historiales', httpOptions);

  }

  public getHistorialByPaciente(pacienteId: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
      })
    }
    return this._http.get('http://localhost:3000/finalg5/historiales/paciente/' + pacienteId, httpOptions);
  }

  public getHistorialByMedico(medicoId: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
      })
    }
    return this._http.get('http://localhost:3000/finalg5/historiales/medico/' + medicoId, httpOptions);
  }

  public getHistorialById(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
      })
    }
    return this._http.get('http://localhost:3000/finalg5/historiales/' + id, httpOptions);
  }
  public createHistorial(historial: Historial): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }

    let body: any = JSON.stringify(historial);

    return this._http.post('http://localhost:3000/finalg5/historiales', body, httpOptions);
  }

  public updateHistorial(historial: Historial): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    let body: any = JSON.stringify(historial);

    return this._http.put('http://localhost:3000/finalg5/historiales/' + historial._id, body, httpOption);
  }

  public deleteHistorial(historial: Historial): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({
      }),
    }
    return this._http.delete('http://localhost:3000/finalg5/historiales/' + historial._id, httpOption);
  }
}
