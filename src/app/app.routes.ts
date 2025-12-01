import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SuperAdminLayoutComponent } from './layouts/super-admin-layout/super-admin-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';


export const routes: Routes = [
  // Root redirect to login
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login'
  },

  // Authentication Routes (no layout needed)
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routing').then(m => m.authRoutes),
    data: {
      title: 'Authentication'
    }
  },

  // Agency Routes with Main Layout - All agency features in one place
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { title: 'Dashboard', breadcrumb: 'Dashboard', roles: ['user', 'admin'] },
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/agency/agency.routing').then(m => m.agencyRoutes)
      }
    ]
  },

  // Profile Routes
  {
    path: 'profile',
    component: MainLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { title: 'Profile', breadcrumb: 'Profile', roles: ['user', 'admin'] },
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/agency/profile/profile.component').then(c => c.ProfileComponent)
      }
    ]
  },

  // Influencer Routes with Main Layout - All influencer features in one place
  {
    path: 'influencer',
    component: MainLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { title: 'Influencer Panel', breadcrumb: 'Influencer', roles: ['influencer'] },
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/influencer/influencer.routing').then(m => m.influencerRoutes)
      }
    ]
  },

  // Super Admin Routes with Super Admin Layout - All super admin features in one place
  {
    path: 'super-admin',
    component: SuperAdminLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { title: 'Super Admin Panel', breadcrumb: 'Super Admin', roles: ['super-admin'] },
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/super-admin/super-admin.routing').then(m => m.SuperAdminRoutes)
      }
    ]
  },

  // Unauthorized Access
  {
    path: 'unauthorized',
    loadComponent: () => import('./pages/error/unauthorized.component').then(c => c.UnauthorizedComponent),
    data: { title: 'Unauthorized Access' }
  },

  // Catch-all redirect
  {
    path: '**',
    loadComponent: () => import('./pages/error/not-found.component').then(c => c.NotFoundComponent)
  }
];
