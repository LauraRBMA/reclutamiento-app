import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Solicitud } from './../../models/solicitud.model';
import { SolicitudService } from './../../services/solicitud.service';
import { CustomValidators } from './../../validators/validators';

@Component({
  selector: 'app-solicitud-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitud-existente-editar.component.html',
  styleUrls: ['./solicitud-existente-editar.component.css'],
})
export class SolicitudExistenteComponent implements OnInit {
  solicitudForm: FormGroup;
  solicitudId: string = '';

  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.solicitudForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required, this.edadValidator]],
      aniosExperiencia: ['', [Validators.required, Validators.min(0)]],
      puestoSolicitado: ['', [Validators.required]],
      estado: ['en espera', [Validators.required]],
      fechaSolicitud: [{ value: '', disabled: true }, [Validators.required]], // Campo deshabilitado
      
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.solicitudService.obtenerSolicitudPorId(+id).subscribe((solicitud) => {
        this.solicitudForm.patchValue(solicitud);
        this.solicitudId = id;
      });
    }
  }

  // Validador personalizado para la edad
  edadValidator(control: AbstractControl): ValidationErrors | null {
    const fechaNacimiento = new Date(control.value);
    const edad = new Date().getFullYear() - fechaNacimiento.getFullYear();
    if (edad < 18 || edad > 65) {
      return { edadInvalida: true };
    }
    return null;
  }

  guardarSolicitud(): void {
    if (this.solicitudForm.valid) {
      const solicitud: Solicitud = this.solicitudForm.getRawValue();
      solicitud.id = this.solicitudId;
      this.solicitudService.actualizarSolicitud(solicitud).subscribe(() => {
        this.router.navigate(['/solicitudes']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/solicitudes']);
  }
}