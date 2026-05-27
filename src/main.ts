import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { HelloComponent } from './hello/hello.component';
import { ParentComponent } from './parent/parent.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, FormsModule, HelloComponent, ParentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <main class="app-container">
      <header class="app-header">
        <h1>🎯 Enterprise Angular Components Demo</h1>
        <p>Comprehensive showcase with product & customer management</p>
      </header>

      <nav class="app-nav">
        <button 
          *ngFor="let tab of tabs" 
          [class.active]="activeTab === tab"
          (click)="activeTab = tab"
          class="nav-button"
        >
          {{ tab }}
        </button>
      </nav>

      <section class="app-content">
        <div *ngIf="activeTab === 'Overview'" class="tab-content">
          <h2>📋 Application Overview</h2>
          <div class="grid-2">
            <div class="info-card">
              <h3>🏗️ Architecture</h3>
              <ul>
                <li>✅ Standalone Components (Angular 20)</li>
                <li>✅ Parent-Child Communication</li>
                <li>✅ Two-way Data Binding</li>
                <li>✅ CRUD Operations</li>
              </ul>
            </div>
            <div class="info-card">
              <h3>📦 Components</h3>
              <ul>
                <li>✅ HelloComponent (Products)</li>
                <li>✅ ParentComponent (Customers)</li>
                <li>✅ ChildComponent (Workflow)</li>
                <li>✅ Enterprise Library Ready</li>
              </ul>
            </div>
          </div>
        </div>

        <div *ngIf="activeTab === 'Products'" class="tab-content">
          <app-hello></app-hello>
        </div>

        <div *ngIf="activeTab === 'Customers'" class="tab-content">
          <app-parent></app-parent>
        </div>

        <div *ngIf="activeTab === 'Docs'" class="tab-content">
          <h2>📚 Component Guide</h2>
          <div class="doc-section">
            <h3>🛍️ HelloComponent - Product Management</h3>
            <p><strong>Features:</strong> Display products, update blog notes, add/delete operations with styled table</p>
          </div>
          <div class="doc-section">
            <h3>👥 ParentComponent - Customer Management</h3>
            <p><strong>Features:</strong> Smart table with search, sort by name, edit/delete actions, receive child messages</p>
          </div>
          <div class="doc-section">
            <h3>📊 ChildComponent - Workflow Timeline</h3>
            <p><strong>Features:</strong> Send messages to parent, display workflow steps with status indicators, complete/reset workflow</p>
          </div>
        </div>
      </section>

      <footer class="app-footer">
        <p>Angular 20 | RxJS 7.8 | @dhinesh-se/angular-components</p>
      </footer>
    </main>
  `,
  styles: [`
    .app-container {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      min-height: 100vh;
      padding: 0;
      margin: 0;
    }
    .app-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .app-header h1 { margin: 0; font-size: 28px; }
    .app-header p { margin: 10px 0 0 0; opacity: 0.9; }
    .app-nav {
      display: flex;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 0 20px;
      gap: 10px;
    }
    .nav-button {
      padding: 15px 20px;
      border: none;
      background: transparent;
      cursor: pointer;
      font-weight: 500;
      color: #666;
      border-bottom: 3px solid transparent;
      transition: all 0.3s;
    }
    .nav-button:hover { color: #667eea; }
    .nav-button.active {
      color: #667eea;
      border-bottom-color: #667eea;
    }
    .app-content {
      max-width: 1200px;
      margin: 20px auto;
      padding: 0 20px;
    }
    .tab-content {
      background: white;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      animation: fadeIn 0.3s ease-in;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .grid-2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }
    .info-card {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 6px;
      border-left: 4px solid #667eea;
    }
    .info-card h3 { margin-top: 0; color: #667eea; }
    .info-card ul { list-style: none; padding: 0; margin: 0; }
    .info-card li { padding: 5px 0; color: #666; }
    .doc-section {
      margin: 20px 0;
      padding: 15px;
      background: #f5f5f5;
      border-radius: 6px;
      border-left: 4px solid #667eea;
    }
    .doc-section h3 { margin-top: 0; color: #667eea; }
    .doc-section p { margin: 10px 0; color: #666; }
    .app-footer {
      background: #333;
      color: #999;
      text-align: center;
      padding: 20px;
      margin-top: 30px;
    }
    h2 {
      color: #333;
      border-bottom: 2px solid #667eea;
      padding-bottom: 10px;
    }
  `]
})
export class App {
  activeTab = 'Overview';
  tabs = ['Overview', 'Products', 'Customers', 'Docs'];
}

bootstrapApplication(App);
