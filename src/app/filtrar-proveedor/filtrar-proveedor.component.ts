import { Component } from '@angular/core';
import { Proveedor } from '../models/proveedor.model';



@Component({
  selector: 'app-filtrar-proveedor',
  templateUrl: './filtrar-proveedor.component.html',
  styleUrls: ['./filtrar-proveedor.component.css'],

})



export class FiltrarProveedorComponent {
  
  filterPost = '';



  constructor() { 

    
  }
  
	



  public proveedor: Proveedor[] = [
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

  




}



