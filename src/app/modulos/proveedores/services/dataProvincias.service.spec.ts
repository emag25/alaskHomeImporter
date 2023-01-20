/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataProvinciasService } from './dataProvincias.service';

describe('Service: DataProvincias', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataProvinciasService]
    });
  });

  it('should ...', inject([DataProvinciasService], (service: DataProvinciasService) => {
    expect(service).toBeTruthy();
  }));
});
