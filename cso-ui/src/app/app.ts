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
  currentDateTime: string = '';

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000); // update every second
  }

  updateDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString(); // e.g., "9/17/2025, 8:45:30 PM"
  }

}
