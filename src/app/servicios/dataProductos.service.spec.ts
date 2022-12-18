/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataProductosService } from './dataProductos.service';

describe('Service: DataProductos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataProductosService]
    });
  });

  it('should ...', inject([DataProductosService], (service: DataProductosService) => {
    expect(service).toBeTruthy();
  }));
});
