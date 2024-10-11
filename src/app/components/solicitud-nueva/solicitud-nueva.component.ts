import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Solicitud } from '../../models/solicitud.model';
import { SolicitudService } from '../../services/solicitud.service';
import { CustomValidators } from '../../validators/validators';

@Component({
  selector: 'app-solicitud-nueva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitud-nueva.component.html',
  styleUrls: ['./solicitud-nueva.component.css'],
})
export class SolicitudNuevaComponent {
  solicitudForm: FormGroup;

  constructor(private fb: FormBuilder, private solicitudService: SolicitudService, private router: Router) {
    this.solicitudForm = this.fb.group({
      nombreCompleto: ['', [CustomValidators.nombreCompleto()]],
      email: ['', [CustomValidators.email()]],
      fechaNacimiento: ['', [CustomValidators.fechaNacimiento()]],
      aniosExperiencia: ['', [CustomValidators.aniosExperiencia()]],
      puestoSolicitado: ['', Validators.required],
      estado: ['en espera', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.solicitudForm.valid) {
      const nuevaSolicitud: Solicitud = this.solicitudForm.value;
      this.solicitudService.agregarSolicitud(nuevaSolicitud);
      this.router.navigate(['/solicitudes']);
    }
  }
}