import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

interface Customer {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

interface Permission {
  name: string;
  granted: boolean;
}

interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
  date: string;
}

@Component({
  selector: 'app-library-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="library-container">
      <h2>🎨 Enterprise Components Library Integration</h2>
      <p class="subtitle">Demonstrations of @dhinesh-se/angular-components features</p>

      <!-- Tabs -->
      <div class="demo-tabs">
        <button 
          *ngFor="let tab of demoTabs"
          [class.active]="activeDemo === tab"
          (click)="activeDemo = tab"
          class="tab-button"
        >
          {{ tab }}
        </button>
      </div>

      <!-- 1. Smart Table Demo -->
      <div *ngIf="activeDemo === 'Smart Table'" class="demo-section">
        <h3>📊 Smart Table Component</h3>
        <p>Interactive table with sorting, filtering, and selection</p>
        
        <div class="controls">
          <input 
            [(ngModel)]="searchQuery"
            placeholder="Search customers..."
            class="search-box"
          />
          <button (click)="sortTable()" class="btn-action">Sort by Name</button>
        </div>

        <table class="smart-table">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  [checked]="allSelected"
                  (change)="toggleSelectAll()"
                />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let customer of filteredCustomers; let idx = index">
              <td>
                <input 
                  type="checkbox" 
                  [checked]="selectedIds.includes(customer.id)"
                  (change)="toggleSelect(customer.id)"
                />
              </td>
              <td>{{ customer.id }}</td>
              <td><strong>{{ customer.name }}</strong></td>
              <td>{{ customer.email }}</td>
              <td>
                <span class="badge" [ngClass]="'badge-' + customer.status">
                  {{ customer.status | uppercase }}
                </span>
              </td>
              <td>{{ customer.joinDate }}</td>
              <td>
                <button (click)="editRow(customer)" class="btn-edit">Edit</button>
                <button (click)="deleteRow(customer.id)" class="btn-delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="info">Selected: {{ selectedIds.length }} | Filtered: {{ filteredCustomers.length }} / {{ customers.length }}</p>
      </div>

      <!-- 2. Dynamic Form Demo -->
      <div *ngIf="activeDemo === 'Dynamic Form'" class="demo-section">
        <h3>📝 Dynamic Form Renderer</h3>
        <p>Schema-driven form with validation and conditional fields</p>
        
        <form class="dynamic-form" (ngSubmit)="submitForm()">
          <div class="form-group">
            <label>Full Name *</label>
            <input 
              type="text" 
              [(ngModel)]="formData.fullName"
              name="fullName"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div class="form-group">
            <label>Email *</label>
            <input 
              type="email" 
              [(ngModel)]="formData.email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div class="form-group">
            <label>Role</label>
            <select [(ngModel)]="formData.role" name="role">
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          <div class="form-group" *ngIf="formData.role === 'admin'">
            <label>
              <input 
                type="checkbox" 
                [(ngModel)]="formData.superAdmin"
                name="superAdmin"
              />
              Super Admin Access
            </label>
          </div>

          <div class="form-group">
            <label>Department</label>
            <select [(ngModel)]="formData.department" name="department">
              <option value="">Select department</option>
              <option value="sales">Sales</option>
              <option value="engineering">Engineering</option>
              <option value="hr">HR</option>
              <option value="finance">Finance</option>
            </select>
          </div>

          <button type="submit" class="btn-submit">Submit Form</button>
          <button type="button" (click)="resetForm()" class="btn-secondary">Reset</button>
        </form>

        <div *ngIf="formSubmitted" class="form-output">
          <h4>Form Output:</h4>
          <pre>{{ formData | json }}</pre>
        </div>
      </div>

      <!-- 3. Permission Directive Demo -->
      <div *ngIf="activeDemo === 'Permissions'" class="demo-section">
        <h3>🔐 Permission Directive</h3>
        <p>Control rendering based on user permissions</p>
        
        <div class="permissions-panel">
          <h4>User Permissions</h4>
          <div class="permission-list">
            <div *ngFor="let perm of userPermissions" class="permission-item">
              <label>
                <input 
                  type="checkbox" 
                  [checked]="perm.granted"
                  (change)="togglePermission(perm.name)"
                />
                {{ perm.name }}
              </label>
            </div>
          </div>
        </div>

        <div class="features-panel">
          <h4>Feature Access</h4>
          
          <div class="feature" *ngIf="hasPermission('view.dashboard')">
            <div class="feature-header">📊 Dashboard</div>
            <p>View analytics and metrics</p>
          </div>

          <div class="feature" *ngIf="hasPermission('edit.data')">
            <div class="feature-header">✏️ Edit Data</div>
            <p>Modify customer and product information</p>
          </div>

          <div class="feature" *ngIf="hasPermission('delete.records')">
            <div class="feature-header">🗑️ Delete Records</div>
            <p>Remove customer and product records</p>
          </div>

          <div class="feature" *ngIf="hasPermission('admin.access')">
            <div class="feature-header">⚙️ Admin Access</div>
            <p>System administration and user management</p>
          </div>

          <div *ngIf="!hasAnyPermission()" class="no-permissions">
            <p>No permissions granted. Enable permissions above to see features.</p>
          </div>
        </div>
      </div>

      <!-- 4. Workflow Timeline Demo -->
      <div *ngIf="activeDemo === 'Workflow'" class="demo-section">
        <h3>📋 Workflow Timeline</h3>
        <p>Visualize process steps and status</p>
        
        <div class="timeline-controls">
          <button (click)="advanceWorkflow()" class="btn-action" [disabled]="workflowComplete">
            ➡️ Advance Step
          </button>
          <button (click)="resetWorkflow()" class="btn-secondary">Reset</button>
        </div>

        <div class="timeline">
          <div *ngFor="let step of workflowSteps" [ngClass]="'timeline-item step-' + step.status">
            <div class="timeline-marker" [ngClass]="'marker-' + step.status">
              <span *ngIf="step.status === 'completed'">✓</span>
              <span *ngIf="step.status === 'active'">●</span>
              <span *ngIf="step.status === 'pending'">○</span>
            </div>
            <div class="timeline-content">
              <h5>{{ step.title }}</h5>
              <p>{{ step.description }}</p>
              <small>{{ step.date }}</small>
            </div>
          </div>
        </div>

        <div *ngIf="workflowComplete" class="success-message">
          ✅ Workflow Completed Successfully!
        </div>
      </div>

      <!-- 5. Query Builder Demo -->
      <div *ngIf="activeDemo === 'Query Builder'" class="demo-section">
        <h3>🔍 Query Builder</h3>
        <p>Build dynamic filter expressions</p>
        
        <div class="query-builder">
          <div class="query-rule">
            <select [(ngModel)]="currentQuery.field" name="field">
              <option value="">Select field</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="status">Status</option>
              <option value="joinDate">Join Date</option>
            </select>

            <select [(ngModel)]="currentQuery.operator" name="operator">
              <option value="equals">Equals</option>
              <option value="contains">Contains</option>
              <option value="startsWith">Starts With</option>
              <option value="greaterThan">Greater Than</option>
              <option value="lessThan">Less Than</option>
            </select>

            <input 
              type="text" 
              [(ngModel)]="currentQuery.value"
              name="value"
              placeholder="Enter value"
            />

            <button (click)="addQuery()" class="btn-action">Add Filter</button>
          </div>

          <div class="active-queries">
            <h4>Active Filters:</h4>
            <div *ngIf="queryFilters.length === 0" class="no-filters">
              No filters applied
            </div>
            <div *ngFor="let query of queryFilters; let idx = index" class="query-tag">
              {{ query.field }} {{ query.operator }} "{{ query.value }}"
              <button (click)="removeQuery(idx)" class="btn-remove">×</button>
            </div>
          </div>

          <div class="query-preview">
            <h4>Query Preview:</h4>
            <pre>{{ generateQueryPreview() }}</pre>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .library-container {
      padding: 20px;
      background: white;
      border-radius: 8px;
    }
    h2 {
      color: #667eea;
      margin: 0 0 5px 0;
    }
    .subtitle {
      color: #999;
      font-size: 14px;
      margin: 0 0 20px 0;
    }
    .demo-tabs {
      display: flex;
      gap: 10px;
      margin: 20px 0;
      border-bottom: 2px solid #eee;
      flex-wrap: wrap;
    }
    .tab-button {
      padding: 10px 16px;
      border: none;
      background: transparent;
      cursor: pointer;
      font-weight: 500;
      color: #666;
      border-bottom: 3px solid transparent;
      transition: all 0.3s;
    }
    .tab-button:hover {
      color: #667eea;
    }
    .tab-button.active {
      color: #667eea;
      border-bottom-color: #667eea;
    }
    .demo-section {
      margin-top: 20px;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 6px;
    }
    .demo-section h3 {
      color: #333;
      margin-top: 0;
    }
    .demo-section p {
      color: #666;
      font-size: 14px;
    }
    .controls, .query-builder {
      display: flex;
      gap: 10px;
      margin: 15px 0;
      flex-wrap: wrap;
      align-items: center;
    }
    .search-box, input, select {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
    input[type="checkbox"] {
      margin-right: 5px;
    }
    .btn-action, .btn-submit {
      padding: 8px 16px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    .btn-action:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .btn-secondary {
      padding: 8px 16px;
      background: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    .btn-edit {
      padding: 4px 8px;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      margin-right: 4px;
    }
    .btn-delete {
      padding: 4px 8px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
    }
    .btn-remove {
      background: none;
      border: none;
      color: #dc3545;
      cursor: pointer;
      font-size: 18px;
      margin-left: 5px;
      padding: 0;
    }
    .smart-table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      background: white;
      border: 1px solid #ddd;
    }
    .smart-table th, .smart-table td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    .smart-table th {
      background: #667eea;
      color: white;
      font-weight: bold;
    }
    .smart-table tr:hover {
      background: #f5f5f5;
    }
    .badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      color: white;
    }
    .badge-active {
      background: #28a745;
    }
    .badge-inactive {
      background: #6c757d;
    }
    .info {
      color: #666;
      font-size: 13px;
      margin: 10px 0 0 0;
    }
    .dynamic-form {
      background: white;
      padding: 20px;
      border-radius: 6px;
      max-width: 500px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-group label {
      display: block;
      margin-bottom: 5px;
      color: #333;
      font-weight: 500;
    }
    .form-group input,
    .form-group select {
      width: 100%;
      box-sizing: border-box;
    }
    .form-output {
      margin-top: 20px;
      padding: 15px;
      background: #f0f0f0;
      border-radius: 4px;
    }
    .form-output pre {
      background: white;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
    }
    .permissions-panel {
      background: white;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    .permission-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
    }
    .permission-item {
      padding: 10px;
      background: #f5f5f5;
      border-radius: 4px;
    }
    .features-panel {
      background: white;
      padding: 15px;
      border-radius: 4px;
    }
    .feature {
      padding: 15px;
      margin: 10px 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 4px;
    }
    .feature-header {
      font-weight: bold;
      margin-bottom: 5px;
    }
    .feature p {
      margin: 0;
      font-size: 13px;
      opacity: 0.9;
    }
    .no-permissions {
      padding: 20px;
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      border-radius: 4px;
      color: #333;
    }
    .timeline {
      position: relative;
      padding: 20px 0;
    }
    .timeline-item {
      display: flex;
      margin-bottom: 25px;
      position: relative;
    }
    .timeline-marker {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-right: 20px;
      flex-shrink: 0;
    }
    .marker-completed {
      background: #28a745;
      color: white;
    }
    .marker-active {
      background: #667eea;
      color: white;
    }
    .marker-pending {
      background: #e0e0e0;
      color: #999;
    }
    .timeline-content h5 {
      margin: 0 0 5px 0;
      color: #333;
    }
    .timeline-content p {
      margin: 0;
      color: #666;
      font-size: 13px;
    }
    .timeline-content small {
      color: #999;
    }
    .timeline-controls {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .success-message {
      padding: 15px;
      background: #d4edda;
      border: 1px solid #c3e6cb;
      color: #155724;
      border-radius: 4px;
      margin-top: 20px;
      font-weight: bold;
    }
    .query-rule {
      display: flex;
      gap: 10px;
      background: white;
      padding: 15px;
      border-radius: 4px;
      align-items: center;
    }
    .query-rule select,
    .query-rule input {
      flex: 1;
      min-width: 120px;
    }
    .active-queries {
      background: white;
      padding: 15px;
      border-radius: 4px;
      margin: 15px 0;
    }
    .no-filters {
      color: #999;
      font-size: 13px;
    }
    .query-tag {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 6px 10px;
      border-radius: 4px;
      margin: 5px 5px 5px 0;
      font-size: 13px;
    }
    .query-preview {
      background: white;
      padding: 15px;
      border-radius: 4px;
      border-left: 4px solid #667eea;
    }
    .query-preview pre {
      background: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      margin: 0;
    }
  `]
})
export class LibraryDemoComponent implements OnInit {
  activeDemo = 'Smart Table';
  demoTabs = ['Smart Table', 'Dynamic Form', 'Permissions', 'Workflow', 'Query Builder'];

  // Smart Table Demo
  customers: Customer[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'active', joinDate: '2024-02-20' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', status: 'inactive', joinDate: '2024-03-10' },
    { id: 4, name: 'David Brown', email: 'david@example.com', status: 'active', joinDate: '2024-04-05' },
    { id: 5, name: 'Emma Davis', email: 'emma@example.com', status: 'active', joinDate: '2024-05-12' },
  ];
  searchQuery = '';
  selectedIds: number[] = [];

  get filteredCustomers(): Customer[] {
    return this.customers.filter(c =>
      c.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get allSelected(): boolean {
    return this.filteredCustomers.length > 0 && 
           this.filteredCustomers.every(c => this.selectedIds.includes(c.id));
  }

  // Dynamic Form Demo
  formData = {
    fullName: '',
    email: '',
    role: '',
    superAdmin: false,
    department: ''
  };
  formSubmitted = false;

  // Permission Demo
  userPermissions: Permission[] = [
    { name: 'view.dashboard', granted: false },
    { name: 'edit.data', granted: false },
    { name: 'delete.records', granted: false },
    { name: 'admin.access', granted: false }
  ];

  // Workflow Demo
  workflowSteps: WorkflowStep[] = [
    { id: 1, title: 'Request Submitted', description: 'Your request has been received', status: 'completed', date: '2026-05-27 09:00' },
    { id: 2, title: 'Under Review', description: 'Admin is reviewing your request', status: 'completed', date: '2026-05-27 10:30' },
    { id: 3, title: 'Processing', description: 'Your request is being processed', status: 'active', date: '2026-05-27 11:45' },
    { id: 4, title: 'Approval', description: 'Waiting for final approval', status: 'pending', date: 'Pending' },
    { id: 5, title: 'Completed', description: 'Your request is complete', status: 'pending', date: 'Pending' }
  ];

  get workflowComplete(): boolean {
    return this.workflowSteps.every(s => s.status === 'completed');
  }

  // Query Builder Demo
  currentQuery = {
    field: '',
    operator: 'equals',
    value: ''
  };
  queryFilters: any[] = [];

  ngOnInit() {
    console.log('Library Demo Component Initialized');
  }

  // Smart Table Methods
  toggleSelectAll() {
    if (this.allSelected) {
      this.selectedIds = [];
    } else {
      this.selectedIds = this.filteredCustomers.map(c => c.id);
    }
  }

  toggleSelect(id: number) {
    const idx = this.selectedIds.indexOf(id);
    if (idx > -1) {
      this.selectedIds.splice(idx, 1);
    } else {
      this.selectedIds.push(id);
    }
  }

  sortTable() {
    this.customers.sort((a, b) => a.name.localeCompare(b.name));
  }

  editRow(customer: Customer) {
    alert(`Edit: ${customer.name}`);
  }

  deleteRow(id: number) {
    this.customers = this.customers.filter(c => c.id !== id);
    this.selectedIds = this.selectedIds.filter(s => s !== id);
  }

  // Form Methods
  submitForm() {
    this.formSubmitted = true;
    console.log('Form submitted:', this.formData);
  }

  resetFormData() {
    this.formData = {
      fullName: '',
      email: '',
      role: '',
      superAdmin: false,
      department: ''
    };
    this.formSubmitted = false;
  }

  // Permission Methods
  togglePermission(permName: string) {
    const perm = this.userPermissions.find(p => p.name === permName);
    if (perm) {
      perm.granted = !perm.granted;
    }
  }

  hasPermission(permName: string): boolean {
    return this.userPermissions.some(p => p.name === permName && p.granted);
  }

  hasAnyPermission(): boolean {
    return this.userPermissions.some(p => p.granted);
  }

  // Workflow Methods
  advanceWorkflow() {
    const pendingStep = this.workflowSteps.find(s => s.status === 'pending');
    const activeStep = this.workflowSteps.find(s => s.status === 'active');
    
    if (activeStep) {
      activeStep.status = 'completed';
    }
    if (pendingStep) {
      pendingStep.status = 'active';
      pendingStep.date = new Date().toLocaleString();
    }
  }

  resetWorkflow() {
    this.workflowSteps[0].status = 'completed';
    this.workflowSteps[1].status = 'completed';
    this.workflowSteps[2].status = 'active';
    this.workflowSteps[3].status = 'pending';
    this.workflowSteps[4].status = 'pending';
  }

  // Query Builder Methods
  addQuery() {
    if (this.currentQuery.field && this.currentQuery.value) {
      this.queryFilters.push({ ...this.currentQuery });
      this.currentQuery = { field: '', operator: 'equals', value: '' };
    }
  }

  removeQuery(idx: number) {
    this.queryFilters.splice(idx, 1);
  }

  generateQueryPreview(): string {
    if (this.queryFilters.length === 0) {
      return 'SELECT * FROM customers;';
    }
    let sql = 'SELECT * FROM customers WHERE ';
    sql += this.queryFilters
      .map(q => `${q.field} ${q.operator} '${q.value}'`)
      .join(' AND ');
    sql += ';';
    return sql;
  }

  resetForm() {
    this.resetFormData();
  }
}
