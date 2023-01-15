/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataProveedoresService } from './dataProveedores.service';

describe('Service: DataProveedores', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataProveedoresService]
    });
  });

  it('should ...', inject([DataProveedoresService], (service: DataProveedoresService) => {
    expect(service).toBeTruthy();
  }));
});
