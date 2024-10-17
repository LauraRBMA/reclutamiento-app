import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudesListComponent } from './solicitud-lista.component';
import { By } from '@angular/platform-browser';

describe('SolicitudListaComponent', () => {
  let component: SolicitudesListComponent;
  let fixture: ComponentFixture<SolicitudesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudesListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cambiar el campo de ordenación y la dirección de ordenación', () => {
    component.setSortField('aniosExperiencia');
    expect(component.sortField).toBe('aniosExperiencia');
    expect(component.sortDirection).toBe('asc');

    component.setSortField('aniosExperiencia');
    expect(component.sortDirection).toBe('desc');

    component.setSortField('puestoSolicitado');
    expect(component.sortField).toBe('puestoSolicitado');
    expect(component.sortDirection).toBe('asc');
  });

  it('debería llamar a setSortField cuando se hace clic en el encabezado de la tabla', () => {
    spyOn(component, 'setSortField');
    const header = fixture.debugElement.query(By.css('th[click]'));
    header.triggerEventHandler('click', null);
    expect(component.setSortField).toHaveBeenCalledWith('aniosExperiencia');
  });
});