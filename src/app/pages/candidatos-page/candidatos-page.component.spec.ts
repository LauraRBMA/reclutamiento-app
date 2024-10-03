import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatosPageComponent } from './candidatos-page.component';

describe('CandidatosPageComponent', () => {
  let component: CandidatosPageComponent;
  let fixture: ComponentFixture<CandidatosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatosPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidatosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
