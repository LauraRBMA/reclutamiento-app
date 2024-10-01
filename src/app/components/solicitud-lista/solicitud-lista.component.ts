import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Solicitud } from './../../models/solicitud.model';
import { SolicitudService } from './../../services/solicitud.service';


@Component({
  selector: 'app-solicitudes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './solicitud-lista.component.html',
  styleUrls: ['./solicitud-lista.component.css'],
})
export class SolicitudesListComponent {
  solicitudes: Solicitud[] = [];

  constructor(private SolicitudService: SolicitudService) {
    this.solicitudes = this.SolicitudService.obtenerSolicitudes();
  }

  filtrarSolicitudes(criterio: string): void {
    // Implementar lógica de filtrado
  }
}
