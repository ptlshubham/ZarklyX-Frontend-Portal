import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

export const profileRoutes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        data: {
            title: 'Profile',
            breadcrumb: 'Profile',
            roles: ['user', 'admin']
        }
    }
];
