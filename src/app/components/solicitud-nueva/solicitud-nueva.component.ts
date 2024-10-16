import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud } from '../../models/solicitud.model';
import { CustomValidators } from '../../validators/validators';

@Component({
  selector: 'app-solicitud-nueva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitud-nueva.component.html',
  styleUrls: ['./solicitud-nueva.component.css']
})
export class SolicitudNuevaComponent {
  solicitudForm: FormGroup;

  constructor(private fb: FormBuilder, private solicitudService: SolicitudService, private router: Router) {
    this.solicitudForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, CustomValidators.nombreCompleto()]],
      email: ['', [Validators.required, CustomValidators.email()]],
      fechaNacimiento: ['', [Validators.required, CustomValidators.fechaNacimiento()]], 
      aniosExperiencia: ['', [Validators.required, CustomValidators.aniosExperiencia()]],
      puestoSolicitado: ['', Validators.required],
      estado: ['en espera', Validators.required],
      fechaSolicitud: [{ value: new Date().toISOString().split('T')[0], disabled: true }]
    });
  }

  onSubmit(): void {
    if (this.solicitudForm.valid) {
      const nuevaSolicitud = new Solicitud(
        Date.now(), // Generar un ID único
        this.solicitudForm.value.nombreCompleto,
        this.solicitudForm.value.email,
        new Date(this.solicitudForm.value.fechaNacimiento),
        this.solicitudForm.value.aniosExperiencia,
        this.solicitudForm.value.puestoSolicitado,
        new Date().toISOString(), // Fecha de solicitud actual
        this.solicitudForm.value.estado
      );

      this.solicitudService.agregarSolicitud(nuevaSolicitud).subscribe(() => {
        this.router.navigate(['/solicitudes']); // Redirigir a la lista de solicitudes
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/solicitudes']);
  }
}