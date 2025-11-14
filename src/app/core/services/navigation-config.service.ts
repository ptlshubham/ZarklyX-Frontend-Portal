import { Injectable } from '@angular/core';
import { NavigationItem } from '../interfaces/route-config.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationConfigService {
  
  // Main Layout Navigation
  getUserNavigation(): NavigationItem[] {
    return [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'group',
        children: [
          {
            id: 'dashboard.overview',
            title: 'Overview',
            type: 'item',
            icon: 'ki-dashboard',
            url: '/dashboard/overview',
            exactMatch: true,
            roles: ['user', 'admin', 'super-admin']
          },
          {
            id: 'dashboard.analytics',
            title: 'Analytics',
            type: 'item',
            icon: 'ki-chart-line',
            url: '/dashboard/analytics',
            roles: ['admin', 'super-admin']
          }
        ]
      },
      {
        id: 'user-management',
        title: 'User Management',
        type: 'group',
        roles: ['admin', 'super-admin'],
        children: [
          {
            id: 'users.list',
            title: 'All Users',
            type: 'item',
            icon: 'ki-users',
            url: '/users/list',
            roles: ['admin', 'super-admin']
          },
          {
            id: 'users.roles',
            title: 'Roles & Permissions',
            type: 'item',
            icon: 'ki-shield',
            url: '/users/roles',
            roles: ['super-admin']
          }
        ]
      },
      {
        id: 'account',
        title: 'Account',
        type: 'group',
        children: [
          {
            id: 'account.profile',
            title: 'Profile',
            type: 'item',
            icon: 'ki-profile-circle',
            url: '/dashboard/account/profile',
            roles: ['user', 'admin', 'super-admin']
          },
          {
            id: 'account.settings',
            title: 'Settings',
            type: 'item',
            icon: 'ki-gear',
            url: '/dashboard/account/settings',
            roles: ['user', 'admin', 'super-admin']
          }
        ]
      }
    ];
  }

  // Admin Layout Navigation
  getAdminNavigation(): NavigationItem[] {
    return [
      {
        id: 'admin-dashboard',
        title: 'Admin Dashboard',
        type: 'item',
        icon: 'ki-dashboard',
        url: '/super-admin/dashboard',
        roles: ['admin', 'super-admin']
      },
      {
        id: 'admin-users',
        title: 'User Management',
        type: 'collapsible',
        icon: 'ki-users',
        roles: ['admin', 'super-admin'],
        children: [
          {
            id: 'admin-users.list',
            title: 'Users List',
            type: 'item',
            url: '/admin/users/list',
            roles: ['admin', 'super-admin']
          },
          {
            id: 'admin-users.create',
            title: 'Create User',
            type: 'item',
            url: '/admin/users/create',
            roles: ['admin', 'super-admin']
          },
          {
            id: 'admin-users.roles',
            title: 'Roles',
            type: 'item',
            url: '/admin/users/roles',
            roles: ['admin', 'super-admin']
          }
        ]
      },
      {
        id: 'admin-reports',
        title: 'Reports',
        type: 'collapsible',
        icon: 'ki-chart',
        roles: ['admin', 'super-admin'],
        children: [
          {
            id: 'admin-reports.analytics',
            title: 'Analytics',
            type: 'item',
            url: '/admin/reports/analytics',
            roles: ['admin', 'super-admin']
          },
          {
            id: 'admin-reports.usage',
            title: 'Usage Reports',
            type: 'item',
            url: '/admin/reports/usage',
            roles: ['admin', 'super-admin']
          }
        ]
      }
    ];
  }

  // Super Admin Layout Navigation
  getSuperAdminNavigation(): NavigationItem[] {
    return [
      {
        id: 'super-admin-dashboard',
        title: 'Super Admin Dashboard',
        type: 'item',
        icon: 'ki-dashboard',
        url: '/super-admin/dashboard',
        roles: ['super-admin']
      },
      {
        id: 'system-management',
        title: 'System Management',
        type: 'collapsible',
        icon: 'ki-gear',
        roles: ['super-admin'],
        children: [
          {
            id: 'system.settings',
            title: 'System Settings',
            type: 'item',
            url: '/super-admin/system/settings',
            roles: ['super-admin']
          },
          {
            id: 'system.maintenance',
            title: 'Maintenance',
            type: 'item',
            url: '/super-admin/system/maintenance',
            roles: ['super-admin']
          },
          {
            id: 'system.backup',
            title: 'Backup & Restore',
            type: 'item',
            url: '/super-admin/system/backup',
            roles: ['super-admin']
          }
        ]
      },
      {
        id: 'security-center',
        title: 'Security Center',
        type: 'collapsible',
        icon: 'ki-shield',
        roles: ['super-admin'],
        children: [
          {
            id: 'security.overview',
            title: 'Security Overview',
            type: 'item',
            url: '/super-admin/security/overview',
            roles: ['super-admin']
          },
          {
            id: 'security.audit-logs',
            title: 'Audit Logs',
            type: 'item',
            url: '/super-admin/security/audit-logs',
            roles: ['super-admin']
          },
          {
            id: 'security.permissions',
            title: 'Permissions',
            type: 'item',
            url: '/super-admin/security/permissions',
            roles: ['super-admin']
          }
        ]
      },
      {
        id: 'analytics-reports',
        title: 'Analytics & Reports',
        type: 'collapsible',
        icon: 'ki-chart-line',
        roles: ['super-admin'],
        children: [
          {
            id: 'analytics.overview',
            title: 'Analytics Overview',
            type: 'item',
            url: '/super-admin/analytics/overview',
            roles: ['super-admin']
          },
          {
            id: 'analytics.performance',
            title: 'Performance Metrics',
            type: 'item',
            url: '/super-admin/analytics/performance',
            roles: ['super-admin']
          },
          {
            id: 'analytics.custom',
            title: 'Custom Reports',
            type: 'item',
            url: '/super-admin/analytics/custom',
            roles: ['super-admin']
          }
        ]
      }
    ];
  }

  // Filter navigation based on user roles
  filterNavigationByRole(navigation: NavigationItem[], userRoles: string[]): NavigationItem[] {
    return navigation.map(item => ({
      ...item,
      hidden: item.roles ? !item.roles.some(role => userRoles.includes(role)) : false,
      children: item.children ? this.filterNavigationByRole(item.children, userRoles) : undefined
    })).filter(item => !item.hidden);
  }

  // Get current user roles (mock implementation)
  getCurrentUserRoles(): string[] {
    return JSON.parse(localStorage.getItem('user_roles') || '["user"]');
  }

  // Get navigation for current user based on layout
  getNavigationForLayout(layout: 'main' | 'admin' | 'super-admin'): NavigationItem[] {
    const userRoles = this.getCurrentUserRoles();
    
    switch (layout) {
      case 'main':
        return this.filterNavigationByRole(this.getUserNavigation(), userRoles);
      case 'admin':
        return this.filterNavigationByRole(this.getAdminNavigation(), userRoles);
      case 'super-admin':
        return this.filterNavigationByRole(this.getSuperAdminNavigation(), userRoles);
      default:
        return [];
    }
  }
}