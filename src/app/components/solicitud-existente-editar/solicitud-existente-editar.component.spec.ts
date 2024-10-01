import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudExistenteEditarComponent } from './solicitud-existente-editar.component';

describe('SolicitudExistenteEditarComponent', () => {
  let component: SolicitudExistenteEditarComponent;
  let fixture: ComponentFixture<SolicitudExistenteEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudExistenteEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudExistenteEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
