import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {

  // para la notificacion de carrito
  private matBadge = new BehaviorSubject<number>(0);
  public customMatBadge = this.matBadge.asObservable();

  constructor() { }

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

}
