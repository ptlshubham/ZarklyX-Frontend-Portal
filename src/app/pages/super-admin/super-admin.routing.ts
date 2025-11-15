import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const SuperAdminRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: {
            title: 'Admin Dashboard',
            breadcrumb: 'Dashboard',
            roles: ['admin', 'super-admin']
        }
    },

    {
        path: 'influencer',
        data: { title: 'Super Admin Panel', breadcrumb: 'Super Admin', roles: ['super-admin'] },
        children: [
            {
                path: '',
                loadChildren: () => import('./influencer-management/influencer-management.routing').then(m => m.InfluencerManagementRoutes)
            }
        ]
    },
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