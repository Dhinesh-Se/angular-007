import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChildComponent } from './child/child.component';
import { BehaviorSubject } from 'rxjs';

export interface Customer {
  id: number;
  name: string;
  tier: string;
  email: string;
  joinDate: string;
}

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [FormsModule, CommonModule, ChildComponent],
  template: `
    <div class="section">
      <h2>👨‍👩‍👧 Parent Component - Smart Table & Customer List</h2>
      
      <div class="content">
        <h3>Child Communication</h3>
        <div class="card">
          <p><strong>Message from Child:</strong> {{ childMessage || 'Waiting for child message...' }}</p>
        </div>
        <app-child (messageEvent)="receiveMessage($event)"></app-child>

        <h3 style="margin-top: 30px;">Customer Management</h3>
        <div class="table-controls">
          <input 
            [(ngModel)]="searchTerm" 
            placeholder="Search customers..."
            class="search-input"
          />
          <button (click)="sortByName()" class="btn-primary">Sort by Name</button>
        </div>

        <table class="customers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Tier</th>
              <th>Join Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let customer of filteredCustomers">
              <td>{{ customer.id }}</td>
              <td><strong>{{ customer.name }}</strong></td>
              <td>{{ customer.email }}</td>
              <td>
                <span class="tier" [ngClass]="'tier-' + customer.tier.toLowerCase()">
                  {{ customer.tier }}
                </span>
              </td>
              <td>{{ customer.joinDate }}</td>
              <td>
                <button (click)="editCustomer(customer.id)" class="btn-edit">Edit</button>
                <button (click)="deleteCustomer(customer.id)" class="btn-delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <p class="info-text">Total Customers: {{ customers.length }} | Filtered: {{ filteredCustomers.length }}</p>
      </div>
    </div>
  `,
  styles: [`
    .section {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin: 10px 0;
    }
    .content { margin-top: 15px; }
    .card {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      margin: 10px 0;
    }
    .table-controls {
      margin: 15px 0;
      display: flex;
      gap: 10px;
    }
    .search-input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .btn-primary {
      background: #007bff;
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    .customers-table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    .customers-table th, .customers-table td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    .customers-table th {
      background: #007bff;
      color: white;
      font-weight: bold;
    }
    .customers-table tr:hover {
      background: #f9f9f9;
    }
    .tier {
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: bold;
      color: white;
    }
    .tier-gold { background: #ffd700; color: #333; }
    .tier-silver { background: #c0c0c0; color: #333; }
    .tier-bronze { background: #cd7f32; }
    .btn-edit, .btn-delete {
      padding: 4px 8px;
      margin: 0 2px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      font-weight: bold;
    }
    .btn-edit {
      background: #28a745;
      color: white;
    }
    .btn-delete {
      background: #dc3545;
      color: white;
    }
    .info-text {
      margin-top: 10px;
      color: #666;
      font-size: 14px;
    }
  `]
})
export class ParentComponent implements OnInit {
  childMessage: string = '';
  searchTerm: string = '';
  
  customers: Customer[] = [
    { id: 1, name: 'Alice Johnson', tier: 'Gold', email: 'alice@example.com', joinDate: '2024-01-15' },
    { id: 2, name: 'Bob Smith', tier: 'Silver', email: 'bob@example.com', joinDate: '2024-02-20' },
    { id: 3, name: 'Carol White', tier: 'Gold', email: 'carol@example.com', joinDate: '2024-03-10' },
    { id: 4, name: 'David Brown', tier: 'Bronze', email: 'david@example.com', joinDate: '2024-04-05' },
    { id: 5, name: 'Emma Davis', tier: 'Silver', email: 'emma@example.com', joinDate: '2024-05-12' },
  ];

  get filteredCustomers(): Customer[] {
    return this.customers.filter(c => 
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngOnInit() {
    console.log('Parent Component initialized with', this.customers.length, 'customers');
  }

  receiveMessage(event: string) {
    this.childMessage = event;
    console.log('📨 Parent received from child:', event);
  }

  sortByName() {
    this.customers.sort((a, b) => a.name.localeCompare(b.name));
    console.log('✅ Customers sorted by name');
  }

  editCustomer(id: number) {
    console.log('✏️ Edit customer:', id);
    alert(`Editing customer ID: ${id}`);
  }

  deleteCustomer(id: number) {
    this.customers = this.customers.filter(c => c.id !== id);
    console.log('🗑️ Customer deleted:', id);
  }
}