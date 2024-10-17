import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SolicitudService } from './solicitud.service';
import { Solicitud } from '../models/solicitud.model';

describe('SolicitudService', () => {
  let service: SolicitudService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SolicitudService]
    });

    service = TestBed.inject(SolicitudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería cargar todas las solicitudes', () => {
    const dummySolicitudes: Solicitud[] = [
      {
        id: 1,
        nombreCompleto: 'Juan Pérez',
        email: 'juan.perez@example.com',
        fechaNacimiento: new Date('1990-01-01'),
        aniosExperiencia: 5,
        puestoSolicitado: 'Desarrollador',
        fechaSolicitud: new Date('2023-10-01').toISOString(),
        estado: 'en espera'
      },
      {
        id: 2,
        nombreCompleto: 'María López',
        email: 'maria.lopez@example.com',
        fechaNacimiento: new Date('1985-05-15'),
        aniosExperiencia: 10,
        puestoSolicitado: 'Gerente de Proyecto',
        fechaSolicitud: new Date('2023-10-01').toISOString(),
        estado: 'en espera'
      }
    ];

    service.solicitudes$.subscribe(solicitudes => {
      expect(solicitudes.length).toBe(2);
      expect(solicitudes).toEqual(dummySolicitudes);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummySolicitudes);
  });
});