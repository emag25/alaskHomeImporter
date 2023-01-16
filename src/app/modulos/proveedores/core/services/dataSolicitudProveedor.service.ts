import { Injectable } from '@angular/core';
import { SolicitudProveedor } from '../models/solicitudProveedor';

@Injectable({
  providedIn: 'root'
})
export class DataSolicitudProveedorService {

  private solicitudesproveedores: SolicitudProveedor[] = [
    {
      id: 1222,
      ruc: '0001234567890',
      nombre: 'LG',
      email: 'anafernandez@lg.com',
      telefono: '0420012345',
      provincia: 'Pichincha',
      fechaSolicitud: new Date('2021-09-01'),
      estado: 'En espera',
    },
    {
      id: 1112,
      ruc: '0009876543210',
      nombre: 'Samsung',
      email: 'josegomez@samsung.com',
      telefono: '0421012345',
      provincia: 'Guayas',
      fechaSolicitud: new Date('2021-09-01'),
      estado: 'En espera',
    },
    {
      id: 1122,
      ruc: '0012309876543',
      nombre: 'Epson',
      email: 'leticiamachado@epson.com',
      telefono: '0422123456',
      provincia: 'Los Rios',
      fechaSolicitud: new Date('2021-09-01'),
      estado: 'En espera',
    },
    {
      id: 1113,
      ruc: '0019876543210',
      nombre: 'Master Frio',
      email: 'mariaperez@masterfrio.com',
      telefono: '0423234567',
      provincia: 'Guayas',
      fechaSolicitud: new Date('2021-08-01'),
      estado: 'En espera',
    },
    {
      id: 1133,
      ruc: '0023456789012',
      nombre: 'Mabe',
      email: 'juangonzalez@mabe.com',
      telefono: '0424345678',
      provincia: 'Guayas',
      fechaSolicitud: new Date('2021-09-6'),
      estado: 'En espera',
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
