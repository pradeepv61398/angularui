import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Register } from './component/register/register';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [ Register,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cso-ui');
}
