import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface WorkflowStep {
  id: number;
  name: string;
  status: 'completed' | 'active' | 'pending';
  timestamp: string;
  description: string;
}

@Component({
  selector: 'app-child',
  imports: [FormsModule, CommonModule],
  standalone: true,
  template: `
    <div class="child-section">
      <h3>👶 Child Component - Workflow Timeline</h3>
      
      <div class="message-section">
        <h4>Send Message to Parent</h4>
        <div class="message-input-group">
          <input 
            [(ngModel)]="message" 
            placeholder="Enter your message..."
            (keyup.enter)="sendMessage()"
            class="message-input"
          />
          <button (click)="sendMessage()" class="btn-send">📤 Send</button>
        </div>
      </div>

      <div class="workflow-section">
        <h4>Workflow Timeline</h4>
        <div class="timeline">
          <div *ngFor="let step of workflowSteps" [ngClass]="'timeline-step step-' + step.status">
            <div class="step-marker" [ngClass]="'marker-' + step.status">
              <span *ngIf="step.status === 'completed'">✓</span>
              <span *ngIf="step.status === 'active'">●</span>
              <span *ngIf="step.status === 'pending'">○</span>
            </div>
            <div class="step-content">
              <h5>{{ step.name }}</h5>
              <p class="step-desc">{{ step.description }}</p>
              <small class="step-time">{{ step.timestamp }}</small>
            </div>
          </div>
        </div>
      </div>

      <div class="action-section">
        <button (click)="completeWorkflow()" class="btn-action">✅ Complete Workflow</button>
        <button (click)="resetWorkflow()" class="btn-secondary">🔄 Reset</button>
      </div>
    </div>
  `,
  styles: [`
    .child-section {
      padding: 15px;
      background: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      margin-top: 10px;
    }
    .message-section {
      margin-bottom: 20px;
    }
    .message-input-group {
      display: flex;
      gap: 10px;
      margin: 10px 0;
    }
    .message-input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }
    .btn-send {
      padding: 10px 16px;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    .workflow-section {
      margin-bottom: 20px;
    }
    .timeline {
      position: relative;
      padding: 20px 0;
    }
    .timeline-step {
      display: flex;
      margin-bottom: 20px;
      position: relative;
      padding-left: 50px;
    }
    .step-marker {
      position: absolute;
      left: 0;
      top: 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
    }
    .marker-completed {
      background: #28a745;
      color: white;
      border: 2px solid #28a745;
    }
    .marker-active {
      background: #007bff;
      color: white;
      border: 2px solid #007bff;
    }
    .marker-pending {
      background: #e0e0e0;
      color: #999;
      border: 2px solid #ccc;
    }
    .step-content {
      flex: 1;
    }
    .step-content h5 {
      margin: 0 0 5px 0;
      font-size: 14px;
    }
    .step-desc {
      margin: 5px 0;
      color: #666;
      font-size: 13px;
    }
    .step-time {
      color: #999;
      font-size: 12px;
    }
    .action-section {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }
    .btn-action, .btn-secondary {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    .btn-action {
      background: #007bff;
      color: white;
    }
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
  `]
})
export class ChildComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  message = '';

  workflowSteps: WorkflowStep[] = [];

  ngOnInit() {
    this.initializeWorkflow();
  }

  initializeWorkflow() {
    this.workflowSteps = [
      {
        id: 1,
        name: 'Request Submitted',
        status: 'completed',
        timestamp: '2026-05-27 09:00',
        description: 'Initial request submitted to the system'
      },
      {
        id: 2,
        name: 'Under Review',
        status: 'completed',
        timestamp: '2026-05-27 10:30',
        description: 'Request is being reviewed by admin'
      },
      {
        id: 3,
        name: 'Processing',
        status: 'active',
        timestamp: '2026-05-27 11:45',
        description: 'Request is currently being processed'
      },
      {
        id: 4,
        name: 'Approval',
        status: 'pending',
        timestamp: 'Pending',
        description: 'Waiting for final approval'
      },
      {
        id: 5,
        name: 'Completed',
        status: 'pending',
        timestamp: 'Pending',
        description: 'Request completion and notification'
      }
    ];
  }

  sendMessage() {
    if (this.message.trim()) {
      this.messageEvent.emit(this.message);
      console.log('👶 Child sent message:', this.message);
      this.message = '';
    }
  }

  completeWorkflow() {
    console.log('✅ Workflow completed');
    this.workflowSteps = this.workflowSteps.map(step => ({
      ...step,
      status: 'completed' as const
    }));
  }

  resetWorkflow() {
    console.log('🔄 Workflow reset');
    this.initializeWorkflow();
  }
}
