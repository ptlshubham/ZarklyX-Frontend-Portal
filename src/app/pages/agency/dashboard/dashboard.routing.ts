import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    component: IndexComponent,
    data: {
      title: 'Dashboard Overview',
      breadcrumb: 'Overview',
      roles: ['user', 'admin', 'super-admin']
    }
  }
  // Add more dashboard child routes here as you create components
];