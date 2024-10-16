import { calcularEdad } from '../utils/date-utils';
import { Solicitud } from './solicitud.model';

describe('Solicitud', () => {
  it('should create an instance of Solicitud', () => {
    const solicitud = new Solicitud(1, 'John Doe', 'john.doe@example.com', new Date('1990-01-01'), 5, 'Developer', '2023-01-01', 'Pending');
    expect(solicitud).toBeTruthy();
  });

  it('should set properties correctly through the constructor', () => {
    const solicitud = new Solicitud(1, 'John Doe', 'john.doe@example.com', new Date('1990-01-01'), 5, 'Developer', '2023-01-01', 'Pending');
    expect(solicitud.id).toBe(1);
    expect(solicitud.nombreCompleto).toBe('John Doe');
    expect(solicitud.email).toBe('john.doe@example.com');
    expect(solicitud.fechaNacimiento).toEqual(new Date('1990-01-01'));
    expect(solicitud.aniosExperiencia).toBe(5);
    expect(solicitud.puestoSolicitado).toBe('Developer');
    expect(solicitud.fechaSolicitud).toBe('2023-01-01');
    expect(solicitud.estado).toBe('Pending');
  });

  it('should calculate age correctly using calcularEdad function', () => {
    const fechaNacimiento = new Date('1990-01-01');
    const solicitud = new Solicitud(1, 'John Doe', 'john.doe@example.com', fechaNacimiento, 5, 'Developer', '2023-01-01', 'Pending');
    const expectedAge = calcularEdad(fechaNacimiento);
    expect(expectedAge).toBe((new Date().getFullYear() - fechaNacimiento.getFullYear()).toString());
  });
});