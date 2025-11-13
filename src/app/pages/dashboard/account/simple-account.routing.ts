import { Routes } from '@angular/router';

// Simple account routes - create components as needed
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
  }
  // Add more account routes as you create the components
];