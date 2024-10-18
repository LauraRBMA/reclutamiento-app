import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { Solicitud } from './../../models/solicitud.model';
import { SolicitudService } from './../../services/solicitud.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-solicitudes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], 
  templateUrl: './solicitud-lista.component.html',
  styleUrls: ['./solicitud-lista.component.css'],
})
export class SolicitudesListComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  sortField: keyof Solicitud | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.solicitudService.obtenerSolicitudes().subscribe(data => {
      this.solicitudes = data;
      this.ordenarSolicitudes();
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
      this.ordenarSolicitudes();
    });
  }

  ordenarSolicitudes(): void {
    this.solicitudes.sort((a, b) => {
      let comparison = 0;
      if (this.sortField) {
        const fieldA = a[this.sortField];
        const fieldB = b[this.sortField];

        if (fieldA === undefined || fieldB === undefined) {
          comparison = fieldA === undefined ? -1 : 1;
        } else {
          if (fieldA < fieldB) {
            comparison = -1;
          } else if (fieldA > fieldB) {
            comparison = 1;
          }
        }

        if (this.sortDirection === 'desc') {
          comparison = comparison * -1;
        }
      }
      return comparison;
    });
  }

  setSortField(field: keyof Solicitud): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.ordenarSolicitudes();
  }

  trackById(index: number, solicitud: Solicitud): string {
    return solicitud.id;
  }
}