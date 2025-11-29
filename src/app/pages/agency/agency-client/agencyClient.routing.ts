import { Routes } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientListComponent } from './client-list/client-list.component';

export const agencyClientRoutes: Routes = [
    {
        path: 'add-client',
        component: AddClientComponent,
        data: {
            title: 'add client',
            breadcrumb: 'add client',
            roles: ['user', 'admin']
        }
    },
    {
        path: 'client-list',
        component: ClientListComponent,
        data: {
            title: 'client list',
            breadcrumb: 'client list',
            roles: ['user', 'admin']
        }
    }
];
