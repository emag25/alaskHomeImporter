import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proveedor } from './../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class DataProveedoresService {


  constructor(private http: HttpClient) { }


  getProveedores(): Observable<Proveedor[]> {
    
    const body = {
      transaccion: 'consultar_todo'
    };
    
    const url = `${environment.urlBAse}${environment.pathUrl.urlGetProveedores}`;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    
    return this.http.post<Proveedor[]>(url, body, httpOptions);
  }


  setProveedor(proveedor: Proveedor): Observable<any> {

    const body = {
      transaccion: 'insertar',
      ruc: proveedor.ruc,
      nombre: proveedor.nombre,
      email: proveedor.email,
      telefono: proveedor.telefono,
      provincia: {
        id: proveedor.provincia.id,
      }
    };

    const url = `${environment.urlBAse}${environment.pathUrl.urlSetProveedor}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    
    return this.http.post(url, body, httpOptions);
  }

  editProveedor(proveedor: Proveedor): Observable<any> {

    const body = {
      transaccion: 'actualizar_datos',
      id: proveedor.id,
      nombre: proveedor.nombre  ,
      email: proveedor.email,
      telefono: proveedor.telefono,
      provincia: {
        id: proveedor.provincia.id,
      },
      logo: proveedor.logo,
    };

    const url = `${environment.urlBAse}${environment.pathUrl.urlSetProveedor}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

    return this.http.post(url, body, httpOptions);
  }


  deleteProveedor(id: number): Observable<any> {

    const body = {
      transaccion: 'actualizar_estado',
      estado: 'Inactivo',
      id: id
    };

    const url = `${environment.urlBAse}${environment.pathUrl.urlSetProveedor}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

    return this.http.delete(url, httpOptions);
  }

}
