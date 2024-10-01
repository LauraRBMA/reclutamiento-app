export class Solicitud {
  constructor(
    public id : number,
    public nombreCompleto: string,
    public email: string,
    public fechaNacimiento: Date,
    public aniosExperiencia: number,
    public puestoSolicitado: string,
    public fechaSolicitud: string,
    public estado: string
  ) {}

  // Getter para calcular la edad en base a la fecha de nacimiento
  get edad(): string {
    const diff = Date.now() - new Date(this.fechaNacimiento).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
  }
}
