import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SolicitudExistenteComponent } from './solicitud-existente-editar.component';
import { SolicitudService } from './../../services/solicitud.service';
import { Solicitud } from './../../models/solicitud.model';

describe('SolicitudExistenteEditarComponent', () => {
  let component: SolicitudExistenteComponent;
  let fixture: ComponentFixture<SolicitudExistenteComponent>;
  let solicitudService: jasmine.SpyObj<SolicitudService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const solicitudServiceSpy = jasmine.createSpyObj('SolicitudService', ['obtenerSolicitudPorId', 'actualizarSolicitud']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, RouterTestingModule],
      declarations: [SolicitudExistenteComponent],
      providers: [
        { provide: SolicitudService, useValue: solicitudServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudExistenteComponent);
    component = fixture.componentInstance;
    solicitudService = TestBed.inject(SolicitudService) as jasmine.SpyObj<SolicitudService>;
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch solicitud by id on init', () => {
    const mockSolicitud = new Solicitud(1, 'John Doe', 'john.doe@example.com', new Date('1990-01-01'), 5, 'Developer', '2023-01-01', 'Pending');
    solicitudService.obtenerSolicitudPorId.and.returnValue(of(mockSolicitud));

    component.ngOnInit();

    expect(solicitudService.obtenerSolicitudPorId).toHaveBeenCalledWith(1);
    expect(component.solicitud).toEqual(mockSolicitud);
  });

  it('should update solicitud and navigate on save', () => {
    const mockSolicitud = new Solicitud(1, 'John Doe', 'john.doe@example.com', new Date('1990-01-01'), 5, 'Developer', '2023-01-01', 'Pending');
    solicitudService.actualizarSolicitud.and.returnValue(of(null));
    const routerSpy = spyOn(component['router'], 'navigate');

    component.solicitud = mockSolicitud;
    component.guardarSolicitud();

    expect(solicitudService.actualizarSolicitud).toHaveBeenCalledWith(mockSolicitud);
    expect(routerSpy).toHaveBeenCalledWith(['/solicitudes']);
  });

  it('should navigate on cancel', () => {
    const routerSpy = spyOn(component['router'], 'navigate');

    component.cancelar();

    expect(routerSpy).toHaveBeenCalledWith(['/solicitudes']);
  });
});