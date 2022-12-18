import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class DataCategoriasService {


  private categorias: Categoria[] = [
    {
      id: 1,
      nombre: 'Fantasia'
    },
    {
      id: 2,
      nombre: 'Animacion'
    },
    {
      id: 3,
      nombre: 'Superheroes'
    },
    {
      id: 4,
      nombre: 'Terror'
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
