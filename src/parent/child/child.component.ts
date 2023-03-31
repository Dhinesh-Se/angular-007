// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-child',
//   standalone:true,
//   template: `
//     <h2>Child Component</h2>
//     <p>Message from Parent: {{ChildMessage}}</p>
//   `,
// })
// export class ChildComponent {
//   @Input()ChildMessage: string;
// }
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child',
  imports:[FormsModule],
  standalone:true,
  template: `
    <h2>Child Component</h2>
    <input [(ngModel)]="message">
    <button (click)="sendMessage()">Send Message to Parent</button>
  `,
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();
  message = "";

  sendMessage() {
    this.messageEvent.emit(this.message);
  }
}
