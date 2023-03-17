import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ventas } from '../models/ventas.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private ventas: Ventas[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getVentas(): Ventas[] {
    return this.ventas;
  }

  setVenta(venta: Ventas) {
    this.ventas.push(venta);
  }

  verificarVentas(): boolean {
    if (this.getVentas().length === 0) {
      console.log("No hay Ventas");
      return false;
    }
    else {
      console.log("Si hay ventas");
      return true;
    }
  }

  getVentasAPI(): Observable<any> {
    const body = {
      transaccion: 'consultar_todo'
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlVentas.GetVentas}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, body, httpOptions);
  }

  async consumirVentasAPI() {

    if (!this.verificarVentas()) {
      await this.getVentasAPI().toPromise()
        .then(data => {

          if (Array.isArray(data) && data.length > 0) {
              
            data.forEach(venta => {
              venta.carritos = [];
              this.setVenta(venta);
            });
          }
        }).catch(error => {
          console.log(error);
        });
      console.log(this.getVentas());
    }
  }

}
