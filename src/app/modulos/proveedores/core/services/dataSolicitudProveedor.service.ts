import { Injectable } from '@angular/core';
import { SolicitudProveedor } from '../models/solicitudProveedor';

@Injectable({
  providedIn: 'root'
})
export class DataSolicitudProveedorService {

  private solicitudesproveedores: SolicitudProveedor[] = [
    {
      id: 2221,
      ruc: '0004541118097',
      nombre: 'Genius',
      email: 'leonardocarapaz@genius.com',
      telefono: '0421007890',
      provincia: 'El Oro',
      fechaEnvio: new Date('01-01-2023'),
      estado: 'En proceso'
    },

    {
      id: 2112,
      ruc: '0033254356867',
      nombre: 'Innova',
      email: 'pamelacortes@innova.com',
      telefono: '0429896678',
      provincia: 'Los Ríos',
      fechaEnvio: new Date('12-12-2022'),
      estado: 'En proceso'
    },
    {
      id: 2121,
      ruc: '0009321650475',
      nombre: 'Antartic Star',
      email: 'tiniyisu@antarticstar.com',
      telefono: '0429213658',
      provincia: 'El Oro',
      fechaEnvio: new Date('01-09-2023'),
      estado: 'Por revisar'
    },
    {
      id: 2111,
      ruc: '0071246315501',
      nombre: 'Adara Home',
      email: 'santiagolopez@adarahome.com',
      telefono: '0422296685',
      provincia: 'Guayas',
      fechaEnvio: new Date('01-15-2023'),
      estado: 'Por revisar'
    },
    {
      id: 2211,
      ruc: '0068974513477',
      nombre: 'Mega Hierro',
      email: 'marthasisug@megahierro.com',
      telefono: '0426642688',
      provincia: 'Guayas',
      fechaEnvio: new Date('01-17-2023'),
      estado: 'En proceso'
    },
    {
      id: 2222,
      ruc: '0089555412348',
      nombre: 'Corporación Favorita',
      email: 'hildasolano@corporacionfavorita.com',
      telefono: '0421249611',
      provincia: 'Santa Elena',
      fechaEnvio: new Date('01-06-2023'),
      estado: 'Por revisar'
    }
  ];


  constructor() { }

  setSolicitudProveedor(solicitudproveedor: SolicitudProveedor) {
    this.solicitudesproveedores.push(solicitudproveedor);
  }

  
  editSolicitudProveedor(solicitudproveedor: SolicitudProveedor) {
    let obj = this.solicitudesproveedores.find(p => p.id === solicitudproveedor.id);

    if (obj !== undefined) {
      let index = this.solicitudesproveedores.indexOf(obj);
      this.solicitudesproveedores[index] = solicitudproveedor;
      return true;

    } else {
      return false;
    }
  }


  getSolicitudesProveedores(): SolicitudProveedor[] {
    return this.solicitudesproveedores;
  }


  getSolicitudesProveedoresByEstado(estado: string): SolicitudProveedor[] {
    return this.solicitudesproveedores.filter(solicitudproveedor => solicitudproveedor.estado === estado);
  }


  getSolicitudProveedorbyId(id: number) {
    return this.solicitudesproveedores.find(solicitudproveedor => solicitudproveedor.id === id);
  }


  deleteSolicitudProveedor(id: number) {

    let obj = this.solicitudesproveedores.find(solicitudproveedor => solicitudproveedor.id === id);

    if (obj !== undefined) {
      let index = this.solicitudesproveedores.indexOf(obj);
      this.solicitudesproveedores.splice(index, 1);
      return true;

    } else {
      return false;
    }

  }

}
