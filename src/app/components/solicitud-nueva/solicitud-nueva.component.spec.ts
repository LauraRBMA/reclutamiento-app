import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudNuevaComponent } from './solicitud-nueva.component';

describe('SolicitudNuevaComponent', () => {
  let component: SolicitudNuevaComponent;
  let fixture: ComponentFixture<SolicitudNuevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudNuevaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
