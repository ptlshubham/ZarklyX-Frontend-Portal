import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from './menu.service';
import { UserRole } from './menus';

/**
 * Role Switcher Component
 * 
 * A floating button component for easy role switching during development.
 * Only shows in development mode.
 * 
 * Usage:
 * 1. Import this component in your app.component.ts
 * 2. Add <app-role-switcher /> to your template
 * 3. Switch roles by clicking the buttons
 */
@Component({
  selector: 'app-role-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="role-switcher" *ngIf="isDevMode">
      <div class="role-switcher-header">
        <span class="title">Role Switcher</span>
        <button class="close-btn" (click)="toggleCollapsed()">
          {{ collapsed ? '▼' : '▲' }}
        </button>
      </div>
      
      <div class="role-switcher-body" *ngIf="!collapsed">
        <div class="current-role">
          Current: <strong>{{ getCurrentRoleLabel() }}</strong>
        </div>
        
        <div class="menu-stats">
          Items: {{ getMenuItemsCount() }}
        </div>
        
        <div class="role-buttons">
          <button 
            class="role-btn agency"
            [class.active]="currentRole === 'agency'"
            (click)="switchToAgency()"
            title="Agency/Freelancer - 147 items">
            🏢 Agency
            <span class="badge">147</span>
          </button>
          
          <button 
            class="role-btn client"
            [class.active]="currentRole === 'agency_client'"
            (click)="switchToClient()"
            title="Agency Client - 42 items">
            👤 Client
            <span class="badge">42</span>
          </button>
          
          <button 
            class="role-btn employee"
            [class.active]="currentRole === 'agency_employee'"
            (click)="switchToEmployee()"
            title="Agency Employee - 61 items">
            👔 Employee
            <span class="badge">61</span>
          </button>
        </div>
        
        <div class="shortcuts">
          <small>
            Shortcuts: Ctrl+Shift+1/2/3
          </small>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .role-switcher {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      z-index: 9999;
      min-width: 240px;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateY(100px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .role-switcher-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.2);
      cursor: move;
    }

    .title {
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.5px;
    }

    .close-btn {
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .close-btn:hover {
      background: rgba(255,255,255,0.3);
      transform: scale(1.1);
    }

    .role-switcher-body {
      padding: 16px;
    }

    .current-role {
      background: rgba(255,255,255,0.15);
      padding: 10px 12px;
      border-radius: 6px;
      margin-bottom: 12px;
      font-size: 13px;
    }

    .current-role strong {
      font-weight: 700;
      text-transform: capitalize;
    }

    .menu-stats {
      font-size: 12px;
      opacity: 0.9;
      margin-bottom: 16px;
      padding-left: 12px;
    }

    .role-buttons {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 12px;
    }

    .role-btn {
      background: rgba(255,255,255,0.15);
      border: 2px solid rgba(255,255,255,0.3);
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .role-btn:hover {
      background: rgba(255,255,255,0.25);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .role-btn.active {
      background: rgba(255,255,255,0.95);
      color: #667eea;
      border-color: white;
    }

    .role-btn .badge {
      background: rgba(255,255,255,0.3);
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
    }

    .role-btn.active .badge {
      background: #667eea;
      color: white;
    }

    .shortcuts {
      text-align: center;
      padding-top: 12px;
      border-top: 1px solid rgba(255,255,255,0.2);
      opacity: 0.8;
    }

    .shortcuts small {
      font-size: 11px;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .role-switcher {
        bottom: 10px;
        right: 10px;
        min-width: 200px;
      }
    }

    /* Dark background for better visibility */
    .role-switcher::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.3);
      z-index: -1;
      pointer-events: none;
      opacity: 0;
    }
  `]
})
export class RoleSwitcherComponent {
  // Change this to false to hide in production
  isDevMode = true; // Set to !environment.production in real app
  collapsed = false;
  currentRole: string = '';

  constructor(private menuService: MenuService) {
    // Subscribe to role changes
    this.menuService.currentRole$.subscribe(role => {
      this.currentRole = role;
    });

    // Setup keyboard shortcuts
    this.setupKeyboardShortcuts();
  }

  switchToAgency(): void {
    this.menuService.setUserRole(UserRole.AGENCY);
    this.showNotification('Switched to Agency');
  }

  switchToClient(): void {
    this.menuService.setUserRole(UserRole.AGENCY_CLIENT);
    this.showNotification('Switched to Client');
  }

  switchToEmployee(): void {
    this.menuService.setUserRole(UserRole.AGENCY_EMPLOYEE);
    this.showNotification('Switched to Employee');
  }

  getCurrentRoleLabel(): string {
    switch(this.currentRole) {
      case UserRole.AGENCY: return 'Agency';
      case UserRole.AGENCY_CLIENT: return 'Client';
      case UserRole.AGENCY_EMPLOYEE: return 'Employee';
      case UserRole.SUPER_ADMIN: return 'Super Admin';
      case UserRole.INFLUENCER: return 'Influencer';
      default: return 'Unknown';
    }
  }

  getMenuItemsCount(): number {
    return this.menuService.getCurrentMenu().length;
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  private setupKeyboardShortcuts(): void {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey) {
        switch(e.key) {
          case '1':
            this.switchToAgency();
            e.preventDefault();
            break;
          case '2':
            this.switchToClient();
            e.preventDefault();
            break;
          case '3':
            this.switchToEmployee();
            e.preventDefault();
            break;
        }
      }
    });
  }

  private showNotification(message: string): void {
    console.log(`✅ ${message}`);
    console.log(`📊 Menu Items: ${this.getMenuItemsCount()}`);
    console.log(`🎯 Role: ${this.getCurrentRoleLabel()}`);
    
    // Optional: Show toast notification
    // You can integrate with your toast service here
  }
}
