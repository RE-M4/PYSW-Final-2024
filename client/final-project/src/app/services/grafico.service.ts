import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {

  constructor(private httpClient: HttpClient) { 

  }

  createChart() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-rapidapi-key': 'e1bb38c4c6mshf82d39fc16c5c78p1a3eebjsn514d585f6cf0',
        'x-rapidapi-host': '24hourcharts.p.rapidapi.com'
      }),
    }

    let body = {
      "type": "bar",
      "title": "Sample Chart",
      "labels": [
        "Jan",
        "Feb",
        "Mar"
      ],
      "datasets": [
        {
          "label": "Totals",
          "values": [
            "$620.00",
            "$577.67",
            "$719.33",
            "$931.33",
            "$712.08"
          ]
        }
      ]
    }

    return this.httpClient.post('https://24hourcharts.p.rapidapi.com/v1/charts/svg', body, httpOptions)
  }
}
