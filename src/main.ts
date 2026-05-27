import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <main class="page">
      <h1>@dhinesh-se/angular-components Demo</h1>
      <p>Angular version updated and sample data is wired to library component placeholders.</p>

      <section class="card">
        <h2>Sample Data</h2>
        <label>
          Name
          <input [(ngModel)]="sampleUser.name" />
        </label>
        <label>
          Email
          <input [(ngModel)]="sampleUser.email" />
        </label>
      </section>

      <section class="card">
        <h2>Library Components</h2>
        <p class="muted">Replace selectors with exact component names if they differ in your package docs.</p>

        <dhinesh-card [title]="'User Profile'">
          <dhinesh-avatar [name]="sampleUser.name"></dhinesh-avatar>
          <dhinesh-badge [label]="sampleUser.role"></dhinesh-badge>
          <dhinesh-button [label]="'Save User'"></dhinesh-button>
        </dhinesh-card>

        <dhinesh-table [data]="sampleProducts" [columns]="productColumns"></dhinesh-table>

        <dhinesh-datepicker [(value)]="selectedDate"></dhinesh-datepicker>
      </section>

      <section class="card">
        <h2>Debug Output</h2>
        <pre>{{ sampleUser | json }}</pre>
        <pre>{{ sampleProducts | json }}</pre>
        <pre>Selected Date: {{ selectedDate }}</pre>
      </section>
    </main>
  `,
})
export class App {
  sampleUser = {
    name: 'Dinesh',
    email: 'dinesh@example.com',
    role: 'Admin',
  };

  sampleProducts = [
    { id: 1, name: 'Keyboard', price: 1599, inStock: true },
    { id: 2, name: 'Mouse', price: 899, inStock: true },
    { id: 3, name: 'Monitor', price: 12999, inStock: false },
  ];

  productColumns = ['id', 'name', 'price', 'inStock'];
  selectedDate = '2026-05-27';
}

bootstrapApplication(App);
