import { Routes } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientListComponent } from './client-list/client-list.component';

export const agencyClientRoutes: Routes = [
    // Use single route 'add-client' and pass client data through navigation state instead of using a path param
    {
        path: 'add-client',
        component: AddClientComponent,
        data: {
            title: 'add client',
            breadcrumb: 'add client',
            roles: ['user', 'admin', 'client']
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
