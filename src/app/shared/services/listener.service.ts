import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {

  // matBadge de carrito
  private matBadge = new BehaviorSubject<number>(0);
  public customMatBadge = this.matBadge.asObservable();

  // matBadge de favoritos
  private favoritoMB = new BehaviorSubject<number>(0);
  public customFavoritoMB = this.favoritoMB.asObservable();

  constructor() { }

  // funciones para carrito
  public getMatBadge(): number {
    return this.matBadge.getValue();
  }

  public addMatBadge(matBadge: number) {
    this.matBadge.next(matBadge + 1);
  }

  public restMatBadge(matBadge: number) {
    if (matBadge > 0)
      this.matBadge.next(matBadge - 1);
  }

  // funciones para favoritos
  public getFavoritoMB(): number {
    return this.favoritoMB.getValue();
  }

  public addFavoritoMB(favorito: number) {
    this.favoritoMB.next(favorito + 1);
  }

  public removeFavoritoMB(favorito: number) {
    this.favoritoMB.next(favorito - 1);
  }

}
