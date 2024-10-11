import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Solicitud } from './../../models/solicitud.model';
import { SolicitudService } from './../../services/solicitud.service';

@Component({
  selector: 'app-solicitud-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitud-existente-editar.component.html',
  styleUrls: ['./solicitud-existente-editar.component.css'],
})
export class SolicitudExistenteComponent {
  solicitud: Solicitud = new Solicitud(0, '', '', new Date(), 0, '', '', 'en espera');

  constructor(
    private solicitudService: SolicitudService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.solicitudService.obtenerSolicitudPorId(+id).subscribe((solicitud) => {
        this.solicitud = solicitud;
      });
    }
  }

  guardarSolicitud(): void {
    this.solicitudService.actualizarSolicitud(this.solicitud).subscribe(() => {
      this.router.navigate(['/solicitudes']);
    });
  }

  cancelar(): void {
    this.router.navigate(['/solicitudes']);
  }
}