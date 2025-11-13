import { Routes } from '@angular/router';

// Lazy load account components
export const accountRoutes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent),
    data: {
      title: 'User Profile',
      breadcrumb: 'Profile',
      roles: ['user', 'admin', 'super-admin']
    }
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(c => c.SettingsComponent),
    data: {
      title: 'Account Settings',
      breadcrumb: 'Settings',
      roles: ['user', 'admin', 'super-admin']
    }
  },
  {
    path: 'security',
    loadComponent: () => import('./security/security.component').then(c => c.SecurityComponent),
    data: {
      title: 'Security Settings',
      breadcrumb: 'Security',
      roles: ['user', 'admin', 'super-admin']
    }
  }
];