import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ListenerService } from '../servicios/listener.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  active: boolean = false;

  constructor(private listener: ListenerService, private cookie: CookieService, private router: Router) {
    this.active = this.cookie.get('active') === 'true' ? true : false;
    this.listener.changeState(this.active, this.cookie.get('username'));
  }

  ngOnInit() { }

  irProductos() {
    this.router.navigate(['/productos']);
  }
}
