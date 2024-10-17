export class Solicitud {
  constructor(
    public id : string,
    public nombreCompleto: string,
    public email: string,
    public fechaNacimiento: Date,
    public aniosExperiencia: number,
    public puestoSolicitado: string,
    public fechaSolicitud: string,
    public estado: string,
    public edad?: number
  ) {}
}

