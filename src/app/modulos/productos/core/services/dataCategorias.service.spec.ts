/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataCategoriasService } from './dataCategorias.service';

describe('Service: DataCategorias', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataCategoriasService]
    });
  });

  it('should ...', inject([DataCategoriasService], (service: DataCategoriasService) => {
    expect(service).toBeTruthy();
  }));
});
