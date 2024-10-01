import { Routes } from '@angular/router';
import { SolicitudFormComponent } from './solicitud-form/solicitud-form.component';
import { SolicitudesListComponent } from './solicitudes-list/solicitudes-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'solicitudes', pathMatch: 'full' },
  { path: 'solicitudes', component: SolicitudesListComponent },
  { path: 'solicitudes/nueva', component: SolicitudFormComponent },
  { path: 'solicitudes/editar/:id', component: SolicitudFormComponent },
];
