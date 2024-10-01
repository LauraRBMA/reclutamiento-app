import { Injectable } from '@angular/core';
import { Solicitud } from '../models/solicitud.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private solicitudes: Solicitud[] = [
    new Solicitud(
      1,
      'Juan Pérez',
      'juan.perez@email.com',
      new Date('1990-05-15'),
      5,
      'Desarrollador',
      '2023-09-15',
      'aprobado'
    ),
    new Solicitud(
      2,
      'Ana García',
      'ana.garcia@email.com',
      new Date('1988-03-10'),
      8,
      'Gerente de Proyectos',
      '2023-09-10',
      'en espera'
    ),
    // Otras solicitudes
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
