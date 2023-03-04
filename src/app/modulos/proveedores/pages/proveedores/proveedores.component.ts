import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SolicitudProveedorComponent } from '../../components/solicitud-proveedor/solicitud-proveedor.component';
import { Proveedor } from '../../models/proveedor.model';
import { DataProveedoresService } from '../../services/dataProveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  
  proveedores: Proveedor[] = [];

  constructor(private _dataProveedores: DataProveedoresService, private dialog:MatDialog) { }

  ngOnInit(): void {

    this._dataProveedores.getProveedores().subscribe(data => {
      this.proveedores = data;
    });

  }

  irSolicitudProveedor() {
    this.dialog.open(SolicitudProveedorComponent, { disableClose: true, width: '700px' });
  }


}
