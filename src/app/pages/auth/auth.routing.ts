import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./main-login/main-login.component').then(c => c.MainLoginComponent),
        data: {
            title: 'Login',
            breadcrumb: 'Login'
        }
    },
    {
        path: 'login/influencer',
        loadComponent: () => import('./influencer-login/influencer-login.component').then(c => c.InfluencerLoginComponent),
        data: {
            title: 'Influencer Login',
            breadcrumb: 'Influencer Login'
        }
    },
    {
        path: 'login/super-admin',
        loadComponent: () => import('./super-admin-login/super-admin-login.component').then(c => c.SuperAdminLoginComponent),
        data: {
            title: 'Super Admin Login',
            breadcrumb: 'Super Admin Login'
        }
    }
];