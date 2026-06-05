import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HelloComponent } from './hello/hello.component';
import { LibraryDemoComponent } from './library-demo/library-demo.component';
import { ParentComponent } from './parent/parent.component';
import { PermissionDemoComponent } from './permission-demo/permission-demo.component';
import { WorkflowDemoComponent } from './workflow-demo/workflow-demo.component';

interface DemoTab {
  readonly id: 'overview' | 'products' | 'customers' | 'permissions' | 'workflow' | 'library';
  readonly label: string;
}

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [
    CommonModule,
    HelloComponent,
    LibraryDemoComponent,
    ParentComponent,
    PermissionDemoComponent,
    WorkflowDemoComponent
  ],
  template: `
    <main class="app-shell">
      <section class="hero">
        <p class="eyebrow">Angular 20 Standalone Demo</p>
        <h1>Enterprise Angular Components Demo</h1>
        <p>
          Explore product management, customer communication, permissions,
          workflow timelines, and the integrated component library examples.
        </p>
      </section>

      <nav class="tabs" aria-label="Demo sections">
        <button
          *ngFor="let tab of tabs"
          type="button"
          class="tab"
          [class.active]="activeTab === tab.id"
          (click)="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </nav>

      <section class="tab-panel" [ngSwitch]="activeTab">
        <div *ngSwitchCase="'overview'" class="overview-grid">
          <article class="overview-card" *ngFor="let tab of tabs.slice(1)">
            <h2>{{ tab.label }}</h2>
            <p>{{ descriptions[tab.id] }}</p>
            <button type="button" class="link-button" (click)="activeTab = tab.id">
              Open {{ tab.label }}
            </button>
          </article>
        </div>

        <app-hello *ngSwitchCase="'products'"></app-hello>
        <app-parent *ngSwitchCase="'customers'"></app-parent>
        <app-permission-demo *ngSwitchCase="'permissions'"></app-permission-demo>
        <app-workflow-demo *ngSwitchCase="'workflow'"></app-workflow-demo>
        <app-library-demo *ngSwitchCase="'library'"></app-library-demo>
      </section>
    </main>
  `,
  styles: [`
    .app-shell {
      max-width: 1180px;
      margin: 0 auto;
      padding: 24px;
    }

    .hero {
      padding: 28px;
      border-radius: 18px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 18px 40px rgba(102, 126, 234, 0.25);
    }

    .hero h1 {
      margin: 0 0 12px;
      font-size: clamp(2rem, 5vw, 3.25rem);
      line-height: 1;
    }

    .hero p {
      max-width: 760px;
      margin: 0;
      font-size: 1.05rem;
      opacity: 0.92;
    }

    .eyebrow {
      margin-bottom: 10px !important;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 0.78rem !important;
      font-weight: 700;
    }

    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 22px 0;
    }

    .tab,
    .link-button {
      border: 0;
      border-radius: 999px;
      cursor: pointer;
      font-weight: 700;
      transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
    }

    .tab {
      padding: 10px 16px;
      background: white;
      color: #475569;
      box-shadow: 0 2px 10px rgba(15, 23, 42, 0.08);
    }

    .tab:hover,
    .link-button:hover {
      transform: translateY(-1px);
    }

    .tab.active {
      background: #4f46e5;
      color: white;
      box-shadow: 0 8px 20px rgba(79, 70, 229, 0.25);
    }

    .tab-panel {
      min-height: 360px;
    }

    .overview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }

    .overview-card {
      padding: 20px;
      border-radius: 14px;
      background: white;
      box-shadow: 0 4px 18px rgba(15, 23, 42, 0.08);
    }

    .overview-card h2 {
      margin-top: 0;
      color: #1e293b;
    }

    .overview-card p {
      color: #64748b;
      min-height: 48px;
    }

    .link-button {
      padding: 9px 14px;
      background: #eef2ff;
      color: #4338ca;
    }

    @media (max-width: 640px) {
      .app-shell {
        padding: 14px;
      }

      .hero {
        padding: 22px;
      }
    }
  `]
})
export class App {
  activeTab: DemoTab['id'] = 'overview';

  readonly tabs: DemoTab[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'products', label: 'Products' },
    { id: 'customers', label: 'Customers' },
    { id: 'permissions', label: 'Permissions' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'library', label: 'Library Demo' }
  ];

  readonly descriptions: Record<DemoTab['id'], string> = {
    overview: 'A quick landing page for navigating the demo application.',
    products: 'Manage sample products with template-driven forms and table actions.',
    customers: 'Review parent-child component communication and customer operations.',
    permissions: 'Switch between viewer, editor, and admin permissions using PermissionStore.',
    workflow: 'Visualize and update a multi-step order workflow timeline.',
    library: 'Browse additional smart table, dynamic form, permissions, workflow, and query examples.'
  };
}

bootstrapApplication(App).catch(error => console.error(error));
