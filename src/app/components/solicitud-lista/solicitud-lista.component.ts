import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Solicitud } from './../../models/solicitud.model';
import { SolicitudService } from './../../services/solicitud.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-solicitudes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './solicitud-lista.component.html',
  styleUrls: ['./solicitud-lista.component.css'],
})
export class SolicitudesListComponent implements OnInit {
  solicitudes: Solicitud[] = [];

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.solicitudService.obtenerSolicitudes().subscribe(data => {
      this.solicitudes = data;
    });
  }

  filtrarSolicitudes(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const criterio = inputElement.value.toLowerCase();
    this.solicitudService.obtenerSolicitudes().pipe(
      map(solicitudes => solicitudes.filter(solicitud =>
        solicitud.nombreCompleto.toLowerCase().includes(criterio) ||
        solicitud.email.toLowerCase().includes(criterio) ||
        solicitud.puestoSolicitado.toLowerCase().includes(criterio)
      ))
    ).subscribe(data => {
      this.solicitudes = data;
    });
  }

  trackById(index: number, solicitud: Solicitud): number {
    return solicitud.id;
  }
}