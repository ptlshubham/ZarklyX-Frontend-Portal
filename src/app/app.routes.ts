import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SuperAdminLayoutComponent } from './layouts/super-admin-layout/super-admin-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { DashboardComponent } from './pages/super-admin/dashboard/dashboard.component';

export const routes: Routes = [
  // Root redirect to main login
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

  // User Dashboard with Main Layout
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      title: 'Dashboard',
      breadcrumb: 'Dashboard',
      roles: ['user', 'admin', 'super-admin']
    },
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        loadComponent: () => import('./pages/agency/dashboard/index/index.component').then(c => c.IndexComponent),
        data: {
          title: 'Dashboard Overview',
          breadcrumb: 'Overview',
          roles: ['user', 'admin', 'super-admin']
        }
      }
    ]
  },

  // Influencer Panel with Main Layout
  // {
  //   path: 'influencer',
  //   component: MainLayoutComponent,
  //   canActivate: [AuthGuard, RoleGuard],
  //   data: {
  //     title: 'Influencer Panel',
  //     breadcrumb: 'Influencer',
  //     roles: ['influencer']
  //   },
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'dashboard',
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'dashboard',
  //       loadComponent: () => import('./pages/dashboard/index/index.component').then(c => c.IndexComponent),
  //       data: {
  //         title: 'Influencer Dashboard',
  //         breadcrumb: 'Dashboard',
  //         roles: ['influencer']
  //       }
  //     }
  //   ]
  // },

  // Admin Panel with Super Admin Layout
  {
    path: 'admin',
    component: SuperAdminLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      title: 'Admin Panel',
      breadcrumb: 'Admin',
      roles: ['admin', 'super-admin']
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Admin Dashboard',
          breadcrumb: 'Dashboard',
          roles: ['admin', 'super-admin']
        }
      },
      // {
      //   path: 'users',
      //   component: UsersComponent,
      //   data: {
      //     title: 'Admin Users',
      //     breadcrumb: 'Users',
      //     roles: ['admin', 'super-admin']
      //   }
      // }
    ]
  },

  // Super Admin Panel with Super Admin Layout  
  {
    path: 'super-admin',
    component: SuperAdminLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      title: 'Super Admin Panel',
      breadcrumb: 'Super Admin',
      roles: ['super-admin']
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Super Admin Dashboard',
          breadcrumb: 'Dashboard',
          roles: ['super-admin']
        }
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
