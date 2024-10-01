import { Routes } from '@angular/router';
import { SolicitudExistenteComponent } from './components/solicitud-existente-editar/solicitud-existente-editar.component';
import { SolicitudesListComponent } from './components/solicitud-lista/solicitud-lista.component';
import { SolicitudNuevaComponent } from './components/solicitud-nueva/solicitud-nueva.component';

export const routes: Routes = [
  { path: '', redirectTo: 'solicitudes', pathMatch: 'full' },
  { path: 'solicitudes', component: SolicitudesListComponent },
  { path: 'solicitudes/nueva', component: SolicitudNuevaComponent},
  { path: 'solicitudes/editar/:id', component: SolicitudExistenteComponent },
];
