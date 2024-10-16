import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { SolicitudesListComponent } from './solicitud-lista.component';
import { SolicitudService } from './../../services/solicitud.service';
import { Solicitud } from './../../models/solicitud.model';

describe('SolicitudesListComponent', () => {
  let component: SolicitudesListComponent;
  let fixture: ComponentFixture<SolicitudesListComponent>;
  let solicitudService: jasmine.SpyObj<SolicitudService>;

  beforeEach(async () => {
    const solicitudServiceSpy = jasmine.createSpyObj('SolicitudService', ['obtenerSolicitudes']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientModule, RouterModule],
      declarations: [SolicitudesListComponent],
      providers: [
        { provide: SolicitudService, useValue: solicitudServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesListComponent);
    component = fixture.componentInstance;
    solicitudService = TestBed.inject(SolicitudService) as jasmine.SpyObj<SolicitudService>;
    solicitudService.obtenerSolicitudes.and.returnValue(of([
      {
        id: 1,
        nombreCompleto: 'John Doe',
        email: 'john.doe@example.com',
        fechaNacimiento: new Date('1990-01-01'),
        aniosExperiencia: 5,
        puestoSolicitado: 'Developer',
        estado: 'en espera',
        fechaSolicitud: '2023-01-01',
        edad: 33
      }
    ]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch solicitudes on init', () => {
    component.ngOnInit();
    expect(component.solicitudes.length).toBe(1);
    expect(component.solicitudes[0].nombreCompleto).toBe('John Doe');
  });

  it('should filter solicitudes based on criteria', () => {
    const inputEvent = { target: { value: 'john' } } as unknown as Event;
    component.filtrarSolicitudes(inputEvent);
    expect(component.solicitudes.length).toBe(1);
    expect(component.solicitudes[0].nombreCompleto).toBe('John Doe');
  });

  it('should return the correct id in trackById', () => {
    const solicitud = {
      id: 1,
      nombreCompleto: 'John Doe',
      email: 'john.doe@example.com',
      fechaNacimiento: new Date('1990-01-01'),
      aniosExperiencia: 5,
      puestoSolicitado: 'Developer',
      estado: 'en espera',
      fechaSolicitud: '2023-01-01',
      edad: 33
    };
    const id = component.trackById(0, solicitud);
    expect(id).toBe(1);
  });
});