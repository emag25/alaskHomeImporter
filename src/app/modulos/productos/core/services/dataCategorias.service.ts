import { Injectable } from '@angular/core';
import { Categoria } from './../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class DataCategoriasService {


  private categorias: Categoria[] = [
    {
      id: 1,
      nombre: 'Technologia'
    },
    {
      id: 2,
      nombre: 'ElectroHogar'
    },
    {
      id: 3,
      nombre: 'Hogar'
    },
    {
      id: 4,
      nombre: 'Muebles'
    },
    {
      id: 5,
      nombre: 'Ferreteria'
    },
    {
      id: 6,
      nombre: 'Movilidad'
    }
  ];

  constructor() { }


  getCategorias(): Categoria[] {
    return this.categorias;
  }


  deletecategorias(id: number) {

    let obj = this.categorias.find(categoria => categoria.id === id);

    if (obj !== undefined) {
      let index = this.categorias.indexOf(obj);
      this.categorias.splice(index, 1);
      return true;

    } else {
      return false;
    }

  }

}
