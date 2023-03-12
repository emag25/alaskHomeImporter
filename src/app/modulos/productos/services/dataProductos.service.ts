import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataProductosService {

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<any> {    
    const url = `${environment.urlBAse}${environment.pathUrl.urlProductos.urlObtenerProductos}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.get(url,httpOptions);
  }

  insertarProductos(producto: Producto): Observable<any> {    
    const url = `${environment.urlBAse}${environment.pathUrl.urlProductos.urlInsertarProductos}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url,producto,httpOptions);
  }
} 