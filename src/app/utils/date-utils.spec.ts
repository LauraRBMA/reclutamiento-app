import { calcularEdad } from './date-utils';

describe('calcularEdad', () => {
  it('should return the correct age for a given date of birth', () => {
    const fechaNacimiento = new Date('1990-01-01');
    const edad = calcularEdad(fechaNacimiento);
    const expectedEdad = (new Date().getFullYear() - 1990).toString();
    expect(edad).toBe(expectedEdad);
  });

  it('should return "0" for a date of birth today', () => {
    const fechaNacimiento = new Date();
    const edad = calcularEdad(fechaNacimiento);
    expect(edad).toBe('0');
  });

  it('should handle leap years correctly', () => {
    const fechaNacimiento = new Date('2000-02-29');
    const edad = calcularEdad(fechaNacimiento);
    const expectedEdad = (new Date().getFullYear() - 2000).toString();
    expect(edad).toBe(expectedEdad);
  });

  it('should return the correct age for a date of birth in the future', () => {
    const fechaNacimiento = new Date('3000-01-01');
    const edad = calcularEdad(fechaNacimiento);
    expect(edad).toBe('0');
  });
});