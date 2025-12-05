import { Routes } from '@angular/router';

export const ClientRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../client/dashboard/client-dashboard/client-dashboard.component').then(c => c.ClientDashboardComponent),
        data: {
            title: 'Client Dashboard',
            breadcrumb: 'Dashboard',
            roles: ['client']
        }
    },

];