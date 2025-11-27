import { Injectable } from '@angular/core';
import { MenuService } from './menu.service';
import { UserRole } from './menus';

/**
 * RoleSwitcherService - Helper service for switching between user roles
 * Useful for testing and demo purposes
 */
@Injectable({
    providedIn: 'root'
})
export class RoleSwitcherService {
    
    constructor(private menuService: MenuService) {}

    /**
     * Switch to Agency role
     */
    switchToAgency(): void {
        this.menuService.setUserRole(UserRole.AGENCY);
        console.log('Switched to Agency role');
    }

    /**
     * Switch to Agency Client role
     */
    switchToClient(): void {
        this.menuService.setUserRole(UserRole.AGENCY_CLIENT);
        console.log('Switched to Agency Client role');
    }

    /**
     * Switch to Agency Employee role
     */
    switchToEmployee(): void {
        this.menuService.setUserRole(UserRole.AGENCY_EMPLOYEE);
        console.log('Switched to Agency Employee role');
    }

    /**
     * Switch to Super Admin role
     */
    switchToSuperAdmin(): void {
        this.menuService.setUserRole(UserRole.SUPER_ADMIN);
        console.log('Switched to Super Admin role');
    }

    /**
     * Switch to Influencer role
     */
    switchToInfluencer(): void {
        this.menuService.setUserRole(UserRole.INFLUENCER);
        console.log('Switched to Influencer role');
    }

    /**
     * Get current role
     */
    getCurrentRole(): UserRole {
        return this.menuService.getCurrentRole();
    }

    /**
     * Get all available roles
     */
    getAvailableRoles(): UserRole[] {
        return this.menuService.getAvailableRoles();
    }
}

/**
 * Role Switcher Component (Optional)
 * Add this to your app for easy role switching in development
 */
/*
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleSwitcherService } from './role-switcher.service';
import { UserRole } from './menus';

@Component({
  selector: 'app-role-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="role-switcher" *ngIf="isDevMode">
      <button (click)="switchToAgency()">Agency</button>
      <button (click)="switchToClient()">Client</button>
      <button (click)="switchToEmployee()">Employee</button>
      <span>Current: {{ getCurrentRole() }}</span>
    </div>
  `,
  styles: [`
    .role-switcher {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: white;
      padding: 10px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 9999;
      display: flex;
      gap: 10px;
      align-items: center;
    }
    button {
      padding: 5px 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background: #f0f0f0;
    }
  `]
})
export class RoleSwitcherComponent {
  isDevMode = !environment.production;

  constructor(private roleSwitcher: RoleSwitcherService) {}

  switchToAgency() {
    this.roleSwitcher.switchToAgency();
  }

  switchToClient() {
    this.roleSwitcher.switchToClient();
  }

  switchToEmployee() {
    this.roleSwitcher.switchToEmployee();
  }

  getCurrentRole(): string {
    return this.roleSwitcher.getCurrentRole();
  }
}
*/
