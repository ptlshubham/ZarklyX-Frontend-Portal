import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    data: {
      title: 'Admin Dashboard',
      breadcrumb: 'Dashboard',
      roles: ['admin', 'super-admin']
    }
  }
  // Add more admin routes here as you create components:
  // {
  //   path: 'users',
  //   loadChildren: () => import('./users/users.routing').then(m => m.adminUsersRoutes),
  //   data: {
  //     title: 'User Management',
  //     breadcrumb: 'Users',
  //     roles: ['admin', 'super-admin']
  //   }
  // }
];