import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  host: { 'class': 'min-h-screen w-full bg-gray-100' }
})
export class AppComponent {}

