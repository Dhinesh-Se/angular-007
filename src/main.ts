import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [],
  template: `<h1>Test App Works!</h1>`,
  styles: []
})
export class App {
}

bootstrapApplication(App);
