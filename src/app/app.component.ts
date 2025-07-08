import { Component, AfterViewInit, HostListener } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports:  [LandingPageComponent]
})

export class AppComponent {
 
}