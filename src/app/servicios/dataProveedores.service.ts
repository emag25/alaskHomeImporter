import { Injectable } from '@angular/core';
import { Proveedor } from '../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class DataProveedoresService {

  private proveedores: Proveedor[] = [
    {
      id: 1112,
      ruc: '0151245244444',
      nombre: 'Naviplas',
      email: 'naviplas@naviplas.com',
      telefono: '042672757',
      direccion: 'Florida Norte'
    },
    {
      id: 1222,
      ruc: '0151245555555',
      nombre: 'Master Frio',
      email: 'masterfrio@masterfrio.com',
      telefono: '042672757',
      direccion: 'Samborondon'
    },
    {
      id: 1232,
      ruc: '0151245666666',
      nombre: 'Megamobilier',
      email: 'megamobilier@megamobilier.com',
      telefono: '042672757',
      direccion: 'Riobamba'
    },
    {
      id: 1292,
      ruc: '0151249999999',
      nombre: 'Pintex',
      email: 'pintex@pintex.com',
      telefono: '042672757',
      direccion: 'Florida'
    },
    {
      id: 1722,
      ruc: '0151248888888',
      nombre: 'Toveco',
      email: 'toveco@toveco.com',
      telefono: '042672757',
      direccion: 'Florida'
    },
    {
      id: 1932,
      ruc: '0151247777777',
      nombre: 'Sylvania Electric',
      email: 'sylvaniaelectric@sylvaniaelectric.com',
      telefono: '042672757',
      direccion: 'Florida'
    }
  ];


  constructor() { }

  setProveedor(proveedor: Proveedor) {
    this.proveedores.push(proveedor);
  }

  editProveedor(proveedor: Proveedor) {
    let obj = this.proveedores.find(p => p.id === proveedor.id);

    if (obj !== undefined) {
      let index = this.proveedores.indexOf(obj);
      this.proveedores[index] = proveedor;
      return true;

    } else {
      return false;
    }
  }


  getProveedores(): Proveedor[] {
    return this.proveedores;
  }


  getProveedorbyRuc(ruc: string) {
    return this.proveedores.find(proveedor => proveedor.ruc === ruc);
  }

  
  getProveedorbyNombre(nombre: string) {
    return this.proveedores.find(proveedor => proveedor.nombre === nombre);
  }


  deleteProveedor(id: number) {

    let obj = this.proveedores.find(proveedor => proveedor.id === id);

    if (obj !== undefined) {
      let index = this.proveedores.indexOf(obj);
      this.proveedores.splice(index, 1);
      return true;

    } else {
      return false;
    }

  }

}
