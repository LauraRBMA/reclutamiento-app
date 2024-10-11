import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Solicitud } from '../models/solicitud.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private solicitudesUrl = 'assets/solicitudes.json'; // Ruta al archivo JSON
  private solicitudesSubject = new BehaviorSubject<Solicitud[]>([]);
  solicitudes$ = this.solicitudesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarSolicitudes();
  }

  // Método para cargar todas las solicitudes desde el archivo JSON
  private cargarSolicitudes(): void {
    this.http.get<Solicitud[]>(this.solicitudesUrl).pipe(
      map(data => data.map(item => new Solicitud(
        item.id,
        item.nombreCompleto,
        item.email,
        new Date(item.fechaNacimiento),
        item.aniosExperiencia,
        item.puestoSolicitado,
        item.fechaSolicitud,
        item.estado
      )))
    ).subscribe(solicitudes => this.solicitudesSubject.next(solicitudes));
  }

  // Método para obtener todas las solicitudes
  obtenerSolicitudes(): Observable<Solicitud[]> {
    return this.solicitudes$;
  }

  // Método para agregar una nueva solicitud
  agregarSolicitud(solicitud: Solicitud): void {
    const solicitudes = this.solicitudesSubject.getValue();
    solicitudes.push(solicitud);
    this.solicitudesSubject.next(solicitudes);
  }

  // Método para actualizar una solicitud existente
  actualizarSolicitud(index: number, solicitudActualizada: Solicitud): void {
    const solicitudes = this.solicitudesSubject.getValue();
    solicitudes[index] = solicitudActualizada;
    this.solicitudesSubject.next(solicitudes);
  }

  // Método para eliminar una solicitud
  eliminarSolicitud(index: number): void {
    const solicitudes = this.solicitudesSubject.getValue();
    solicitudes.splice(index, 1);
    this.solicitudesSubject.next(solicitudes);
  }
}