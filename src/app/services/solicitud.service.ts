import { Injectable } from '@angular/core';
import { Solicitud } from '../models/solicitud.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private solicitudes: Solicitud[] = [
    // Datos de ejemplo, puedes eliminarlos si no quieres valores por defecto
    new Solicitud('Juan Pérez', 'juan.perez@email.com', new Date('1990-05-15'), 5, 'Desarrollador', '2024-01-01', 'en espera'),
    new Solicitud('Ana García', 'ana.garcia@email.com', new Date('1985-07-23'), 10, 'Diseñadora', '2024-01-02', 'aprobado'),
  ];

  constructor() {}

  // Método para obtener todas las solicitudes
  obtenerSolicitudes(): Solicitud[] {
    return this.solicitudes;
  }

  // Método para agregar una nueva solicitud
  agregarSolicitud(solicitud: Solicitud): void {
    this.solicitudes.push(solicitud);
  }

  // Método para actualizar una solicitud existente
  actualizarSolicitud(index: number, solicitudActualizada: Solicitud): void {
    this.solicitudes[index] = solicitudActualizada;
  }

  // Método para eliminar una solicitud
  eliminarSolicitud(index: number): void {
    this.solicitudes.splice(index, 1);
  }
}
