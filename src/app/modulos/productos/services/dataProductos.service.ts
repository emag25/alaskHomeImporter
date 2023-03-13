import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataProductosService {
  modificar =false;
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

  insertarProductos(producto: any): Observable<any> {    
    const url = `${environment.urlBAse}${environment.pathUrl.urlProductos.urlInsertarProductos}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url,producto,httpOptions);
  }
  modificarProducto(producto: any): Observable<any> {    
    const url = `${environment.urlBAse}${environment.pathUrl.urlProductos.urlModificarProductos}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    console.log(url,producto)
    return this.http.put(url,producto,httpOptions);
  }
  eliminarProducto(estado: string,id:string): Observable<any> {    
    const body = {
      id,
      nombre: "",
      descripcion: "",
      imagen: "",
      fecha: "",
      precio: 0,
      stock: 0,
      categoria: 0,
      proveedor: 0,
      estado
    }
    const url = `${environment.urlBAse}${environment.pathUrl.urlProductos.urlModificarEstadoProductos}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.put(url,body,httpOptions);
  }
} 