import { Injectable } from '@angular/core';
import { Provincia } from '../models/provincia.model.ts';

@Injectable({
  providedIn: 'root'
})
export class DataProvinciasService {

  private provincias: Provincia[] = [
    {
      id: 1,
      nombre: 'Esmeraldas'
    },
    {
      id: 2,
      nombre: 'Carchi'
    },
    {
      id: 3,
      nombre: 'Imbabura'
    },
    {
      id: 4,
      nombre: 'Sucumbios'
    },
    {
      id: 5,
      nombre: 'Azuay'
    },
    {
      id: 6,
      nombre: 'Bolívar'
    },
    {
      id: 7,
      nombre: 'Canar'
    },
    {
      id: 8,
      nombre: 'Chimborazo'
    },
    {
      id: 9,
      nombre: 'Cotopaxi'
    },
    {
      id: 10,
      nombre: 'El Oro'
    },
    {
      id: 11,
      nombre: 'Galápagos'
    },
    {
      id: 12,
      nombre: 'Guayas'
    },
    {
      id: 13,
      nombre: 'Loja'
    },
    {
      id: 14,
      nombre: 'Los Ríos'
    },
    {
      id: 15,
      nombre: 'Manabí'
    },
    {
      id: 16,
      nombre: 'Morona Santiago'
    },
    {
      id: 17,
      nombre: 'Napo'
    },
    {
      id: 18,
      nombre: 'Orellana'
    },
    {
      id: 19,
      nombre: 'Pastaza'
    },
    {
      id: 20,
      nombre: 'Pichincha'
    },
    {
      id: 21,
      nombre: 'Santa Elena'
    },
    {
      id: 22,
      nombre: 'Santo Domingo de los Tsáchilas'
    },
    {
      id: 23,
      nombre: 'Tungurahua'
    },
    {
      id: 24,
      nombre: 'Zamora Chinchipe'
    }
  ];


  constructor() { }


  getProvincias(): Provincia[] {
    return this.provincias;
  }

  getProvinciabyNombre(nombre: string) {
    return this.provincias.find(provincia => provincia.nombre === nombre);
  }

  getProvinciabyId(id: number) {
    return this.provincias.find(provincia => provincia.id === id);
  }


}