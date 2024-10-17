import { Solicitud } from './solicitud.model';

describe('Solicitud', () => {
  it('debería crear una instancia con los valores correctos', () => {
    const solicitud = new Solicitud(
      1,
      'Juan Pérez',
      'juan.perez@example.com',
      new Date('1990-01-01'),
      5,
      'Desarrollador',
      '2023-10-01',
      'en espera',
      33
    );

    expect(solicitud.id).toBe(1);
    expect(solicitud.nombreCompleto).toBe('Juan Pérez');
    expect(solicitud.email).toBe('juan.perez@example.com');
    expect(solicitud.fechaNacimiento).toEqual(new Date('1990-01-01'));
    expect(solicitud.aniosExperiencia).toBe(5);
    expect(solicitud.puestoSolicitado).toBe('Desarrollador');
    expect(solicitud.fechaSolicitud).toBe('2023-10-01');
    expect(solicitud.estado).toBe('en espera');
    expect(solicitud.edad).toBe(33);
  });

  it('debería crear una instancia sin el campo opcional edad', () => {
    const solicitud = new Solicitud(
      2,
      'María López',
      'maria.lopez@example.com',
      new Date('1985-05-15'),
      10,
      'Gerente de Proyecto',
      '2023-10-01',
      'en espera'
    );

    expect(solicitud.id).toBe(2);
    expect(solicitud.nombreCompleto).toBe('María López');
    expect(solicitud.email).toBe('maria.lopez@example.com');
    expect(solicitud.fechaNacimiento).toEqual(new Date('1985-05-15'));
    expect(solicitud.aniosExperiencia).toBe(10);
    expect(solicitud.puestoSolicitado).toBe('Gerente de Proyecto');
    expect(solicitud.fechaSolicitud).toBe('2023-10-01');
    expect(solicitud.estado).toBe('en espera');
    expect(solicitud.edad).toBeUndefined();
  });
});