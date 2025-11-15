import { Routes } from '@angular/router';

export const agencyRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard/index/index.component').then(c => c.IndexComponent),
        data: {
            title: 'Dashboard',
            breadcrumb: 'Dashboard',
            roles: ['user', 'admin']
        }
    },
    {
        path: 'campaigns',
        loadComponent: () => import('./dashboard/index/index.component').then(c => c.IndexComponent),
        data: {
            title: 'Campaign Management',
            breadcrumb: 'Campaigns',
            roles: ['user', 'admin']
        }
    },
    {
        path: 'influencers',
        loadComponent: () => import('./dashboard/index/index.component').then(c => c.IndexComponent),
        data: {
            title: 'Influencer Management',
            breadcrumb: 'Influencers',
            roles: ['user', 'admin']
        }
    },
    {
        path: 'analytics',
        loadComponent: () => import('./dashboard/index/index.component').then(c => c.IndexComponent),
        data: {
            title: 'Analytics & Reports',
            breadcrumb: 'Analytics',
            roles: ['user', 'admin']
        }
    },
    {
        path: 'settings',
        loadComponent: () => import('./dashboard/index/index.component').then(c => c.IndexComponent),
        data: {
            title: 'Agency Settings',
            breadcrumb: 'Settings',
            roles: ['admin']
        }
    }
];