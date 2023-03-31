import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from './child/child.component';
// import { FormsModule } from '@angular/forms';
// @Component({
//   imports:[ChildComponent,FormsModule],
//   standalone:true,
//   selector: 'app-parent',
//   template: `
//     <h2>Parent Component</h2>
//     <input [(ngModel)]="message"/>
//     <p>Message: {{message}}</p>
//     <app-child [ChildMessage]="message"></app-child>
//   `,
// })
// export class ParentComponent {
//   message = "";
// }
@Component({
  selector: 'app-parent',
  standalone:true,
  imports:[FormsModule,ChildComponent],
  template: `
    <h2>Parent Component</h2>
    <p>Message from Child: {{childMessage}}</p>
    <app-child (messageEvent)="receiveMessage($event)"></app-child>
  `,
})
export class ParentComponent {
  childMessage: string;

  receiveMessage($event: string) {
    this.childMessage = $event;
  }
}