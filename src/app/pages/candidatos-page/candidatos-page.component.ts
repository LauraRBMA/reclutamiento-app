import { Component } from '@angular/core';
import { SolicitudExistenteComponent } from '../../components/solicitud-existente-editar/solicitud-existente-editar.component';
import { SolicitudesListComponent } from "../../components/solicitud-lista/solicitud-lista.component";
import { SolicitudNuevaComponent } from '../../components/solicitud-nueva/solicitud-nueva.component';

@Component({
  selector: 'app-candidatos-page',
  standalone: true,
  imports: [SolicitudesListComponent, SolicitudNuevaComponent, SolicitudExistenteComponent],
  templateUrl: './candidatos-page.component.html',
  styleUrl: './candidatos-page.component.css'
})
export class CandidatosPageComponent {

}
