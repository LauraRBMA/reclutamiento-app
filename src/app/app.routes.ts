import { Routes } from '@angular/router';
import { SolicitudExistenteComponent } from './components/solicitud-existente-editar/solicitud-existente-editar.component';
import { SolicitudesListComponent } from './components/solicitud-lista/solicitud-lista.component';
import { SolicitudNuevaComponent } from './components/solicitud-nueva/solicitud-nueva.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'solicitudes', component: SolicitudesListComponent },
  { path: 'solicitudes/nueva', component: SolicitudNuevaComponent },
  { path: 'solicitudes/editar/:id', component: SolicitudExistenteComponent },
];