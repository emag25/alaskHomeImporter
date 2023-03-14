import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class DataCategoriasService {

  constructor(private http: HttpClient) { }


  obtenerCategorias(): Observable<any> {    
    const url = `${environment.urlBAse}${environment.pathUrl.urlCategorias.urlObtenerCategorias}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.get(url,httpOptions);
  }
  

}
