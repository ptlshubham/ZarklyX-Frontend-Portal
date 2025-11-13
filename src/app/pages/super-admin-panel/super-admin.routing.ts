import { Routes } from '@angular/router';
import { AdminDashboardComponent } from '../admin/admin-dashboard.component';

export const superAdminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    data: {
      title: 'Super Admin Dashboard',
      breadcrumb: 'Dashboard',
      roles: ['super-admin']
    }
  }
  // Add more super admin routes here as you create components:
  // {
  //   path: 'system',
  //   loadChildren: () => import('./system/system.routing').then(m => m.systemRoutes),
  //   data: {
  //     title: 'System Management',
  //     breadcrumb: 'System',
  //     roles: ['super-admin']
  //   }
  // }
];