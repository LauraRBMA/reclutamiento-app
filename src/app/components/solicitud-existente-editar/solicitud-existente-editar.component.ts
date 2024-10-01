import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Solicitud } from './../../models/solicitud.model';
import { SolicitudService } from './../../services/solicitud.service';


@Component({
  selector: 'app-solicitud-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitud-existente-editar.component.html',
  styleUrls: ['./solicitud-existente-editar.component.css'],
})
export class SolicitudFormComponent {
  solicitud: Solicitud = new Solicitud('', '', new Date(), 0, '', '', 'en espera');

  constructor(private SolicitudService: SolicitudService, private router: Router) {}

  guardarSolicitud(): void {
    this.solicitudService.addSolicitud(this.solicitud);
    this.router.navigate(['/solicitudes']);
  }
}
