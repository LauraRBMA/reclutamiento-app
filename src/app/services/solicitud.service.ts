import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, defer, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Solicitud } from '../models/solicitud.model';
import { calcularEdad } from '../utils/date-utils'; // Importar la función calcularEdad

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private apiUrl = 'http://localhost:3000/solicitudes'; // URL del mock-server 
  private solicitudesSubject = new BehaviorSubject<Solicitud[]>([]);
  solicitudes$ = this.solicitudesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarSolicitudes();
  }

  // Método para cargar todas las solicitudes desde el archivo JSON
  private cargarSolicitudes(): void {
    this.http.get<Solicitud[]>(this.apiUrl).pipe(
      map(data => data.map(item => {
        const solicitud = new Solicitud(
          item.id,
          item.nombreCompleto,
          item.email,
          new Date(item.fechaNacimiento),
          item.aniosExperiencia,
          item.puestoSolicitado,
          new Date(item.fechaSolicitud).toISOString(),
          item.estado
        );
        solicitud.edad = parseInt(calcularEdad(solicitud.fechaNacimiento), 10);
        return solicitud;
      }))
    ).subscribe(solicitudes => this.solicitudesSubject.next(solicitudes));
  }

  // Método para obtener todas las solicitudes
  obtenerSolicitudes(): Observable<Solicitud[]> {
    return this.solicitudes$;
  }

  // Método para obtener una solicitud por ID
  obtenerSolicitudPorId(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}/${id}`).pipe(
      map(solicitud => {
        solicitud.edad = parseInt(calcularEdad(solicitud.fechaNacimiento), 10);
        return solicitud;
      })
    );
  }

  // Método para agregar una nueva solicitud
  agregarSolicitud(solicitud: Solicitud): Observable<void> {
    
    return defer(() => {
      const solicitudes = this.solicitudesSubject.getValue();
      solicitud.edad = parseInt(calcularEdad(solicitud.fechaNacimiento), 10);
      solicitudes.push(solicitud);
      this.solicitudesSubject.next(solicitudes);
      return this.guardarSolicitudes(solicitudes);
    });
  }

  // Método para actualizar una solicitud existente
  actualizarSolicitud(solicitud: Solicitud): Observable<void> {
    solicitud.edad = parseInt(calcularEdad(solicitud.fechaNacimiento), 10);
    return this.http.put<void>(`${this.apiUrl}/${solicitud.id}`, solicitud).pipe(
      map(() => {
        const solicitudes = this.solicitudesSubject.getValue();
        const index = solicitudes.findIndex(s => s.id === solicitud.id);
        if (index !== -1) {
          solicitudes[index] = solicitud;
          this.solicitudesSubject.next(solicitudes);
        }
      })
    );
  }

  // Método para eliminar una solicitud
  eliminarSolicitud(id: string): Observable<void> {
    return defer(() => {
      const solicitudes = this.solicitudesSubject.getValue();
      const updatedSolicitudes = solicitudes.filter(s => s.id !== id);
      this.solicitudesSubject.next(updatedSolicitudes);
      return this.guardarSolicitudes(updatedSolicitudes);
    });
  }

  // Método para guardar las solicitudes en el archivo JSON
  private guardarSolicitudes(solicitudes: Solicitud[]): Observable<void> {
    return this.http.post<void>(this.apiUrl, solicitudes);
    
  }
}