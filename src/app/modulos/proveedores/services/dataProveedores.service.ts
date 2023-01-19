import { Injectable } from '@angular/core';
import { Proveedor } from './../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class DataProveedoresService {

  private proveedores: Proveedor[] = [

    // TECHNOLOGY
    {
      id: 1222,
      ruc: '0001234567890',
      nombre: 'LG',
      email: 'anafernandez@lg.com',
      telefono: '0420012345',
      provincia: 'Pichincha',
      logo: 'https://bit.ly/3J0Kp0u',
      fechaAprobacion: new Date('2021-09-01')
    },     
    {
      id: 1112,
      ruc: '0009876543210',
      nombre: 'Samsung',
      email: 'josegomez@samsung.com',
      telefono: '0421012345',
      provincia: 'Guayas',
      logo: 'https://bit.ly/3GKlhbq',
      fechaAprobacion: new Date('2021-09-01')
    },
    {
      id: 1122,
      ruc: '0012309876543',
      nombre: 'Epson',
      email: 'leticiamachado@epson.com',
      telefono: '0422123456',
      provincia: 'Los Ríos',
      logo: 'https://bit.ly/3ktkwvW',
      fechaAprobacion: new Date('2021-09-01')
    },


    // ELECTROHOGAR
    {
      id: 1113,
      ruc: '0019876543210',
      nombre: 'Master Frio',
      email: 'mariaperez@masterfrio.com',
      telefono: '0423234567',
      provincia: 'Guayas',
      logo: 'https://bit.ly/3kn3zTL',
      fechaAprobacion: new Date('2021-09-01')
    },
    {
      id: 1133,
      ruc: '0023456789012',
      nombre: 'Mabe',
      email: 'juangonzalez@mabe.com',
      telefono: '0424345678',
      provincia: 'Guayas',
      logo: 'https://bit.ly/3ZKP78l',
      fechaAprobacion: new Date('2021-09-01')
    },
    {
      id: 1333,
      ruc: '0032109876543',
      nombre: 'Electrolux',
      email: 'alexlopez@electrolux.com',
      telefono: '0425456789',
      provincia: 'Pichincha',
      logo: 'http://bit.ly/3QQdIV8',
      fechaAprobacion: new Date('2021-09-01')
    },


    // HOGAR
    {
      id: 1444,
      ruc: '0043210987654',
      nombre: 'Pintex',
      email: 'lolalizarralde@pintex.com',
      telefono: '0426567890',
      provincia: 'El Oro',
      logo: 'https://bit.ly/3GQKzos',
      fechaAprobacion: new Date('2021-09-01')
    },
    {
      id: 1144,
      ruc: '0054321098765',
      nombre: 'Umco',
      email: 'sarapolit@umco.com',
      telefono: '0427678901',
      provincia: 'Pichincha',
      logo: 'https://bit.ly/3R5ZShP',
      fechaAprobacion: new Date('2021-09-01')
    },
    {
      id: 1114,
      ruc: '0054321098765',
      nombre: 'Cristar',
      email: 'paulaguillen@cristar.com',
      telefono: '0428789012',
      provincia: 'El Oro',
      logo: 'https://bit.ly/3ZKzxcN',
      fechaAprobacion: new Date('2021-09-01')
    },
    {
      id: 1414,
      ruc: '0076543210987',
      nombre: 'Toveco',
      email: 'hernanparraga@toveco.com',
      telefono: '0429801234',
      provincia: 'Pichincha',
      logo: 'https://bit.ly/3Hgs4uK',
      fechaAprobacion: new Date('2021-09-01')
    },


    // MUEBLES
    {
      id: 1555,
      ruc: '0087654321098',
      nombre: 'Megamobilier',
      email: 'alexandervilla@megamobilier.com',
      telefono: '0420901234',
      provincia: 'Guayas',
      logo: 'https://bit.ly/3GR10Rp',
      fechaAprobacion: new Date('2021-09-01')
    },    
    {
      id: 1155,
      ruc: '0098765432109',
      nombre: 'Chaide&Chaide',
      email: 'mishellsuarez@chaide.com',
      telefono: '0421000123',
      provincia: 'Pichincha',
      logo: 'https://bit.ly/3wllb53',
      fechaAprobacion: new Date('2003-9-01')
    },
    {
      id: 1115,
      ruc: '0010987654321',
      nombre: 'Debsa',
      email: 'rogeliosolorzano@debsa.com',
      telefono: '0421001234',
      provincia: 'Los Ríos',
      logo: 'https://bit.ly/3wdfu9l',
      fechaAprobacion: new Date('2005-09-01')
    },
    

    // FERRETERIA
    {
      id: 1116,
      ruc: '0021109876543',
      nombre: 'Bosch',
      email: 'bernardoala@bosch.com',
      telefono: '0421002345',
      provincia: 'Azuay',
      logo: 'https://bit.ly/3J17L66',
      fechaAprobacion: new Date('2011-05-31')
    },
    {
      id: 1166,
      ruc: '0031234567890',
      nombre: 'Plastigama',
      email: 'samirkan@plastigama.com',
      telefono: '0421003450',
      provincia: 'Guayas',
      logo: 'https://bit.ly/3ktfxvh',
      fechaAprobacion: new Date('2001-09-19')
    },
    {
      id: 1666,
      ruc: '0041321098765',
      nombre: 'PTK',
      email: 'clarachia@ptk.com',
      telefono: '0421004506',
      provincia: 'El Oro',
      logo: 'https://bit.ly/3J0dOYl',
      fechaAprobacion: new Date('2021-05-01')
    },


    // MOVILIDAD    
    {
      id: 1777,
      ruc: '0051432109876',
      nombre: 'Segway',
      email: 'rociolitardo@segway.com',
      telefono: '0421005678',
      provincia: 'Los Ríos',
      logo: 'https://bit.ly/3ZQU3IL',
      fechaAprobacion: new Date('2000-09-11')
    },
    {
      id: 1177,
      ruc: '0061543210987',
      nombre: 'Lamborghini',
      email: 'carlsmith@lamborghini.com',
      telefono: '0421006789',
      provincia: 'Azuay',
      logo: 'https://bit.ly/3XC4XjC',
      fechaAprobacion: new Date('2002-10-01')
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
