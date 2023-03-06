import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SolicitudProveedor } from '../models/solicitudProveedor';

@Injectable({
  providedIn: 'root'
})
export class DataSolicitudProveedorService {


  constructor(private http: HttpClient) { }



  getSolicitudes(): Observable<SolicitudProveedor[]> {

    const body = {
      transaccion: 'consultar_todo'
    };

    const url = `${environment.urlBAse}${environment.pathUrl.urlSolicitudes.GetSolicitudes}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

    return this.http.post<SolicitudProveedor[]>(url, body, httpOptions);

  }




  getSolicitudesByEstado(): Observable<SolicitudProveedor[]> {

    const body = {
      transaccion: 'consultar_porEstado',
      estado: 'Por revisar'
    };

    const url = `${environment.urlBAse}${environment.pathUrl.urlSolicitudes.GetSolicitudes}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

    return this.http.post<SolicitudProveedor[]>(url, body, httpOptions);

  }




  setSolicitud(solicitud: SolicitudProveedor): Observable<any> {

    const body = {
      transaccion: 'insertar',
      ruc: solicitud.ruc,
      nombre: solicitud.nombre,
      email: solicitud.email,
      telefono: solicitud.telefono,
      provincia: {
        id: solicitud.provincia.id,
      }
    };

    const url = `${environment.urlBAse}${environment.pathUrl.urlSolicitudes.SetSolicitud}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

    return this.http.post(url, body, httpOptions);
  }





  editSolicitud(solicitud: SolicitudProveedor): Observable<any> {

    const body = {
      transaccion: 'actualizar_datos',
      id: solicitud.id,
      ruc: solicitud.ruc,
      nombre: solicitud.nombre,
      email: solicitud.email,
      telefono: solicitud.telefono,
      provincia: {
        id: solicitud.provincia.id,
      },
      estado: solicitud.estado
    };

    const url = `${environment.urlBAse}${environment.pathUrl.urlSolicitudes.UpdateSolicitud}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

    return this.http.put(url, body, httpOptions);
  }





  deleteSolicitud(id: number): Observable<any> {

    const body = {
      transaccion: 'actualizar_estado',
      estado: 'Rechazada',
      id: id
    };

    const url = `${environment.urlBAse}${environment.pathUrl.urlSolicitudes.DeleteSolicitud}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }

    return this.http.delete(url, { ...httpOptions, body });

  }

}
