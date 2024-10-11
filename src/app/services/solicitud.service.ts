import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Solicitud } from '../models/solicitud.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private apiUrl = 'http://localhost:4200/solicitudes'; // URL base de la API
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
        item.fechaSolicitud, // Convertir la fecha aquí
        item.estado
      )))
    ).subscribe(solicitudes => this.solicitudesSubject.next(solicitudes));
  }

  // Método para obtener todas las solicitudes
  obtenerSolicitudes(): Observable<Solicitud[]> {
    return this.solicitudes$;
  }

  // Método para obtener una solicitud por ID
  obtenerSolicitudPorId(id: number): Observable<Solicitud> {
    return this.solicitudes$.pipe(
      map(
        (solicitudes) => solicitudes.find((solicitud) => solicitud.id === id)!
      )
    );
  }

  // Método para agregar una nueva solicitud
  agregarSolicitud(solicitud: Solicitud): Observable<void> {
    const solicitudes = this.solicitudesSubject.getValue();
    solicitud.id = solicitudes.length > 0 ? Math.max(...solicitudes.map(s => s.id)) + 1 : 1;
    solicitudes.push(solicitud);
    this.solicitudesSubject.next(solicitudes);
    return new Observable<void>(observer => {
      observer.next();
      observer.complete();
    });
  }
  // Método para actualizar una solicitud existente
  actualizarSolicitud(solicitud: Solicitud): Observable<void> {
    const solicitudes = this.solicitudesSubject.getValue();
    const index = solicitudes.findIndex(s => s.id === solicitud.id);
    if (index !== -1) {
      solicitudes[index] = solicitud;
      this.solicitudesSubject.next(solicitudes);
      return new Observable<void>(observer => {
        observer.next();
        observer.complete();
      });
    }
    return new Observable<void>(observer => {
      observer.error('Solicitud no encontrada');
      observer.complete();
    });
  }
  // Método para eliminar una solicitud
  eliminarSolicitud(id: number): Observable<void> {
    const solicitudes = this.solicitudesSubject.getValue();
    const updatedSolicitudes = solicitudes.filter(s => s.id !== id);
    this.solicitudesSubject.next(updatedSolicitudes);
    return new Observable<void>(observer => {
      observer.next();
      observer.complete();
    });
  }
}
