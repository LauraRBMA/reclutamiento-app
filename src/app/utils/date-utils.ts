export function calcularEdad(fechaNacimiento: Date): string {
    const diff = Date.now() - new Date(fechaNacimiento).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
  }