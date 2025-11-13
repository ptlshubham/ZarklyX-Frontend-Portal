import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { IndexComponent as DashboardIndexComponent } from './pages/dashboard/index/index.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardIndexComponent },
      { path: 'users', component: UsersComponent }, // New page - automatically gets layout!
      // All new pages will automatically inherit this layout
      // Example: { path: 'settings', component: SettingsComponent },
      // Example: { path: 'reports', component: ReportsComponent },
    ],
  },
];
