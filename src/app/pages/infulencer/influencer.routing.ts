import { Routes } from '@angular/router';

export const influencerRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../agency/dashboard/index/index.component').then(c => c.IndexComponent),
        data: {
            title: 'Influencer Dashboard',
            breadcrumb: 'Dashboard',
            roles: ['influencer']
        }
    },
    {
        path: 'profile',
        loadComponent: () => import('../agency/dashboard/index/index.component').then(c => c.IndexComponent),
        data: {
            title: 'My Profile',
            breadcrumb: 'Profile',
            roles: ['influencer']
        }
    },
    {
        path: 'campaigns',
        loadComponent: () => import('../agency/dashboard/index/index.component').then(c => c.IndexComponent),
        data: {
            title: 'My Campaigns',
            breadcrumb: 'Campaigns',
            roles: ['influencer']
        }
    },
    {
        path: 'earnings',
        loadComponent: () => import('../agency/dashboard/index/index.component').then(c => c.IndexComponent),
        data: {
            title: 'Earnings',
            breadcrumb: 'Earnings',
            roles: ['influencer']
        }
    },
    {
        path: 'content',
        loadComponent: () => import('../agency/dashboard/index/index.component').then(c => c.IndexComponent),
        data: {
            title: 'Content Management',
            breadcrumb: 'Content',
            roles: ['influencer']
        }
    }
];