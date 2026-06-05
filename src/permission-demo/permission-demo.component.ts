import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionDirective, PermissionStore } from '@dhinesh-se/angular-components';

@Component({
  selector: 'app-permission-demo',
  standalone: true,
  imports: [CommonModule, PermissionDirective],
  templateUrl: './permission-demo.component.html',
  styleUrls: ['./permission-demo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionDemoComponent {
  currentRole$ = this.permissionStore.currentPermissions$;

  constructor(private permissionStore: PermissionStore) {}

  grantAdminPermissions() {
    this.permissionStore.setPermissions([
      'report.read',
      'report.write',
      'report.delete',
      'admin.settings',
      'admin.users'
    ]);
  }

  grantBasicPermissions() {
    this.permissionStore.setPermissions(['report.read']);
  }

  grantEditorPermissions() {
    this.permissionStore.setPermissions([
      'report.read',
      'report.write',
      'content.edit'
    ]);
  }
}
