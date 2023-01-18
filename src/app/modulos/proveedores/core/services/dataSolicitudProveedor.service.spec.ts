/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataSolicitudProveedorService } from './dataSolicitudProveedor.service';

describe('Service: DataSolicitudProveedor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataSolicitudProveedorService]
    });
  });

  it('should ...', inject([DataSolicitudProveedorService], (service: DataSolicitudProveedorService) => {
    expect(service).toBeTruthy();
  }));
});
