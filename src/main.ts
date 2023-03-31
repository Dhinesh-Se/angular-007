import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ParentComponent } from './parent/parent.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule,FormsModule],
  template: `
  <input [(ngModel)]="name" placeholder="Enter your name">
  <p>Hello, {{name}}!</p>
  <h2>Update Book</h2>
  `,
})
export class App {
  name : string=""
  id:number=10
}
// bootstrapApplication(App);
// bootstrapApplication(HelloComponent);
bootstrapApplication(ParentComponent);
