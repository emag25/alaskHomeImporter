import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrito } from '../models/carrito.model';
import { VentaService } from './venta.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: Carrito[] = [];

  constructor(
    private http: HttpClient,
    private ventaService: VentaService
  ) { }

  getCarritos(): Carrito[] {
    return this.carrito;
  }

  setCarrito(carrito: Carrito) {
    this.carrito.push(carrito);
  }

  verificarCarritos(): boolean {
    if (this.getCarritos().length === 0) {
      console.log("No hay Carritos");
      return false;
    }
    else {
      console.log("Si hay Carritos");
      console.log(this.ventaService.getVentas());
      return true;
    }
  }

  getCarritoByIDAPI(id: number): Observable<any> {
    const body = {
      id: id
    };
    const url = `${environment.urlBAse}${environment.pathUrl.urlVentas.GetCarritos}`;    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Access-Control-Allow-Origin': '*'
      })
    }    
    return this.http.post(url, body, httpOptions);
  }

  async consumirCarritosAPI() {

    if (!this.verificarCarritos()) {

      this.ventaService.getVentas().forEach(async venta => {
        
      
      await this.getCarritoByIDAPI(venta.id).toPromise()
        .then(data => {

          if (Array.isArray(data) && data.length > 0) {
              
            data.forEach(carrito => {
              this.setCarrito(carrito);
              venta.carritos?.push(carrito);
            });
          }
        }).catch(error => {
          console.log(error);
        });

      });
      console.log(this.ventaService.getVentas());
    }
  }
}
