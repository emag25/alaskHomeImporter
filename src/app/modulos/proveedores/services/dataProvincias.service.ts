import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Provincia } from '../models/provincia.model.ts';

@Injectable({
  providedIn: 'root'
})
export class DataProvinciasService {


  constructor(private http: HttpClient) { }


  getProvincias(): Observable<Provincia[]> {

    const body = {
      transaccion: 'consultar_todo'
    };

    const url = `${environment.urlBAse}${environment.pathUrl.urlGetProvincias}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

    return this.http.post<Provincia[]>(url, body, httpOptions);
  }



  getProvinciabyNombre(nombre: string): Observable<Provincia[]> {

    const body = {
      transaccion: 'consultar_todo',
      nombre: nombre
    };

    const url = `${environment.urlBAse}${environment.pathUrl.urlGetProvincias}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

    return this.http.post<Provincia[]>(url, body, httpOptions);
  }



  getProvinciabyId(id: number): Observable<Provincia[]> {

    const body = {
      transaccion: 'consultar_todo',
      id: id
    };

    const url = `${environment.urlBAse}${environment.pathUrl.urlGetProvincias}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

    return this.http.post<Provincia[]>(url, body, httpOptions);
  }


}