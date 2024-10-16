import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HomePageComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Aplicación de Reclutamiento';
}
