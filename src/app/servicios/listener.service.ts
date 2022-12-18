import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListenerService {

  // usuario activo = usuario logueado
  private active = new BehaviorSubject<boolean>(false);
  public customState = this.active.asObservable();

  private username = new BehaviorSubject<string>('');
  public customUsername = this.username.asObservable();

  // para la notificaicon de carrito
  private matBadge = new BehaviorSubject<number>(0);
  public customMatBadge = this.matBadge.asObservable();

  constructor() { }

  public changeState(active: boolean, username: string): void {
    this.active.next(active);
    this.username.next(username);
  }

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
