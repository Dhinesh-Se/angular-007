import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="section">
      <h2>🛍️ Hello Component - Product Management</h2>
      
      <div class="content">
        <h3>Current Product</h3>
        <div class="card">
          <p><strong>Title:</strong> {{ items.title }}</p>
          <p><strong>Price:</strong> ₹{{ items.price }}</p>
          <p><strong>Stock:</strong> {{ items.inStock ? 'Available' : 'Out of Stock' }}</p>
        </div>

        <h3>Update Blog Entry</h3>
        <div class="form-group">
          <label>Blog Note:</label>
          <input [(ngModel)]="myBlog" placeholder="Enter note" />
        </div>
        <p><strong>Current Note:</strong> {{ myBlog }}</p>

        <div class="button-group">
          <button (click)="addItems()" class="btn-primary">➕ Add Product</button>
          <button (click)="updateProduct()" class="btn-secondary">📝 Update</button>
        </div>

        <h3>Products List</h3>
        <table class="products-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of products">
              <td>{{ product.title }}</td>
              <td>₹{{ product.price }}</td>
              <td>{{ product.inStock ? '✅' : '❌' }}</td>
              <td>
                <button (click)="deleteProduct(product.id)" class="btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
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
    .form-group {
      margin: 10px 0;
      display: flex;
      flex-direction: column;
    }
    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-top: 5px;
    }
    .button-group {
      margin: 15px 0;
      display: flex;
      gap: 10px;
    }
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    .btn-primary {
      background: #007bff;
      color: white;
    }
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    .btn-danger {
      background: #dc3545;
      color: white;
      padding: 4px 8px;
      font-size: 12px;
    }
    .products-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    .products-table th, .products-table td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }
    .products-table th {
      background: #007bff;
      color: white;
    }
  `]
})
export class HelloComponent {
  name = 'Dhinesh';
  items = {
    title: 'Football',
    price: 700,
    inStock: true,
    id: 1
  };
  
  myBlog: string = 'Sachin Tendulkar - 10K, Rohit Sharma - 45 centuries';
  
  products = [
    { id: 1, title: 'Football', price: 700, inStock: true },
    { id: 2, title: 'Cricket Bat', price: 1500, inStock: true },
    { id: 3, title: 'Tennis Racket', price: 2500, inStock: false },
  ];

  addItems() {
    console.log('✅ Product added:', this.items);
    alert('Product added successfully!');
  }

  updateProduct() {
    console.log('📝 Product updated with blog note:', this.myBlog);
    alert('Product updated successfully!');
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    console.log('🗑️ Product deleted:', id);
  }
}
