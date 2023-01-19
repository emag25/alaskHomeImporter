import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SolicitudProveedorComponent } from '../../components/solicitud-proveedor/solicitud-proveedor.component';
import { DataProveedoresService } from '../../services/dataProveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  
  proveedores: any[] = this.dataProveedores.getProveedores();

  constructor(private dataProveedores: DataProveedoresService, private dialog:MatDialog) { }

  ngOnInit(): void {

  }

  irSolicitudProveedor() {
    this.dialog.open(SolicitudProveedorComponent, { disableClose: true, width: '700px' });
  }

  onLoadImage(event: any) {
    console.log(event);
  }

}
