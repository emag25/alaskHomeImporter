/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DataSolicitudProveedorService } from './dataSolicitudProveedor.service';


describe('DataSolicitudProveedorService', () => {
  let service: DataSolicitudProveedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSolicitudProveedorService);
  });

  it('Deberia ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('should return all solicitudproveedores', () => {
    const solicitudproveedores = service.getSolicitudesProveedores();
    expect(solicitudproveedores.length).toBeGreaterThan(0);
  });

  it('should return solicitudproveedores by estado', () => {
    const estado = 'En proceso';
    const solicitudproveedores = service.getSolicitudesProveedoresByEstado(estado);
    expect(solicitudproveedores.length).toBeGreaterThan(0);
    expect(solicitudproveedores.every(solicitudproveedor => solicitudproveedor.estado === estado)).toBeTrue();
  });

  it('should return a solicitudproveedor by id', () => {
    const id = 2221;
    const solicitudproveedor = service.getSolicitudProveedorbyId(id);
    expect(solicitudproveedor).toBeDefined();
    expect(solicitudproveedor?.id).toEqual(id);
  });

  it('should add a new solicitudproveedor', () => {
    const newSolicitudProveedor = {
      id: 3000,
      ruc: '0098765432109',
      nombre: 'Nuevo Proveedor',
      email: 'nuevoproveedor@example.com',
      telefono: '0421000000',
      provincia: 'Example Province',
      fechaEnvio: new Date(),
      estado: 'En proceso'
    };
    service.setSolicitudProveedor(newSolicitudProveedor);
    const solicitudproveedores = service.getSolicitudesProveedores();
    const addedSolicitudProveedor = solicitudproveedores.find(solicitudproveedor => solicitudproveedor.id === newSolicitudProveedor.id);
    expect(addedSolicitudProveedor).toBeDefined();
    expect(addedSolicitudProveedor?.nombre).toEqual(newSolicitudProveedor.nombre);
  });


  it('should return solicitudproveedores with estado "Por revisar"', () => {
    const estado = 'Por revisar';
    const solicitudproveedores = service.getSolicitudesProveedoresByEstado(estado);

    expect(solicitudproveedores.length).toBeGreaterThan(0);
    expect(solicitudproveedores.every(solicitudproveedor => solicitudproveedor.estado === estado)).toBeTrue();
  });


});