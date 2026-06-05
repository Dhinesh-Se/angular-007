import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowTimelineComponent, WorkflowStep } from '@dhinesh-se/angular-components';

interface WorkflowStepData extends WorkflowStep {
  description?: string;
}

@Component({
  selector: 'app-workflow-demo',
  standalone: true,
  imports: [CommonModule, WorkflowTimelineComponent],
  templateUrl: './workflow-demo.component.html',
  styleUrls: ['./workflow-demo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkflowDemoComponent {
  workflowSteps: WorkflowStepData[] = [
    {
      id: '1',
      label: 'Order Placed',
      status: 'completed' as const,
      metadata: { user: 'Customer', date: '2025-01-15' },
      description: 'Order has been successfully created'
    },
    {
      id: '2',
      label: 'Payment Verified',
      status: 'completed' as const,
      metadata: { processor: 'Stripe', amount: '$99.99' },
      description: 'Payment has been processed and verified'
    },
    {
      id: '3',
      label: 'Processing',
      status: 'active' as const,
      metadata: { warehouse: 'US-East-1', stage: 'Picking' },
      description: 'Order is being prepared for shipment'
    },
    {
      id: '4',
      label: 'Shipped',
      status: 'pending' as const,
      metadata: { carrier: 'FedEx', tracking: '123456789' },
      description: 'Waiting for shipment'
    },
    {
      id: '5',
      label: 'Delivered',
      status: 'pending' as const,
      metadata: { recipient: 'Delivery Address' },
      description: 'Final delivery status'
    }
  ];

  currentStepIndex = 2;
  selectedStep: WorkflowStepData = this.workflowSteps[this.currentStepIndex];

  get progressPercentage(): number {
    const completedCount = this.workflowSteps.filter(
      step => step.status === 'completed'
    ).length;
    return Math.round((completedCount / this.workflowSteps.length) * 100);
  }

  completeStep() {
    if (this.currentStepIndex < this.workflowSteps.length) {
      // Use immutable update pattern with spread operator
      this.workflowSteps = this.workflowSteps.map((step, index) => {
        if (index === this.currentStepIndex) {
          return { ...step, status: 'completed' as const };
        }
        return step;
      });

      // Move to next step
      if (this.currentStepIndex + 1 < this.workflowSteps.length) {
        this.workflowSteps = this.workflowSteps.map((step, index) => {
          if (index === this.currentStepIndex + 1) {
            return { ...step, status: 'active' as const };
          }
          return step;
        });
        this.currentStepIndex++;
      }

      this.selectedStep = this.workflowSteps[this.currentStepIndex];
    }
  }

  failStep() {
    if (this.currentStepIndex < this.workflowSteps.length) {
      // Use immutable update pattern with spread operator
      this.workflowSteps = this.workflowSteps.map((step, index) => {
        if (index === this.currentStepIndex) {
          return { ...step, status: 'failed' as const };
        }
        return step;
      });
      this.selectedStep = this.workflowSteps[this.currentStepIndex];
    }
  }

  resetWorkflow() {
    this.workflowSteps = [
      {
        id: '1',
        label: 'Order Placed',
        status: 'completed' as const,
        metadata: { user: 'Customer', date: '2025-01-15' },
        description: 'Order has been successfully created'
      },
      {
        id: '2',
        label: 'Payment Verified',
        status: 'completed' as const,
        metadata: { processor: 'Stripe', amount: '$99.99' },
        description: 'Payment has been processed and verified'
      },
      {
        id: '3',
        label: 'Processing',
        status: 'active' as const,
        metadata: { warehouse: 'US-East-1', stage: 'Picking' },
        description: 'Order is being prepared for shipment'
      },
      {
        id: '4',
        label: 'Shipped',
        status: 'pending' as const,
        metadata: { carrier: 'FedEx', tracking: '123456789' },
        description: 'Waiting for shipment'
      },
      {
        id: '5',
        label: 'Delivered',
        status: 'pending' as const,
        metadata: { recipient: 'Delivery Address' },
        description: 'Final delivery status'
      }
    ];
    this.currentStepIndex = 2;
    this.selectedStep = this.workflowSteps[this.currentStepIndex];
  }

  onStepSelected(step: WorkflowStep) {
    const selectedIndex = this.workflowSteps.findIndex(workflowStep => workflowStep.id === step.id);

    if (selectedIndex >= 0) {
      this.currentStepIndex = selectedIndex;
      this.selectedStep = this.workflowSteps[selectedIndex];
    }
  }
}
