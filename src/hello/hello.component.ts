import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [FormsModule],
  template: `
  <h1>Product</h1>
 <h2>Title : {{items.title}}</h2>
 <h2>Price : {{items.price}}</h2>
<span><input type [(ngModel)]='myBlog'></span> 
<h1>{{myBlog}}<h1>
<button (click)='additems()'>
    Add Product
</button>
`,
})
export class HelloComponent {
  name = 'dhinesh';
  items = {
    title: 'Foot Ball',
    price: 700,
  };
  myBlog: string = 'Sachin 10, Ro 45';
  additems() {
    console.log('add items');
  }
}
