import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-exito',
  templateUrl: './dialog-exito.component.html',
  styleUrls: ['./dialog-exito.component.css']
})
export class DialogExitoComponent {

  constructor(private router: Router) {}

  onSubmit() {
    
    this.router.navigate(['/productos']);
  }

}
