import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarProveedorComponent } from './filtrar-proveedor.component';


describe('FiltrarProveedorComponent', () => {
  let component: FiltrarProveedorComponent;
  let fixture: ComponentFixture<FiltrarProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrarProveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

