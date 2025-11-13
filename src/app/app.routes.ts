import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SuperAdminLayoutComponent } from './layouts/super-admin-layout/super-admin-layout.component';
import { IndexComponent as DashboardIndexComponent } from './pages/dashboard/index/index.component';
import { UsersComponent } from './pages/users/users.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  
  // Regular User Layout Routes
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardIndexComponent },
      { path: 'users', component: UsersComponent },
      // Add more regular user pages here
    ],
  },

  // Super Admin Layout Routes
  {
    path: 'admin',
    component: SuperAdminLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent }, // Dedicated admin dashboard
      { path: 'users/all', component: UsersComponent }, // Admin user management
      // Add more super admin pages here:
      // { path: 'users/roles', component: RolesComponent },
      // { path: 'system/settings', component: SystemSettingsComponent },
      // { path: 'security', component: SecurityComponent },
      // { path: 'analytics', component: AnalyticsComponent },
      // { path: 'logs', component: SystemLogsComponent },
    ],
  },
];
