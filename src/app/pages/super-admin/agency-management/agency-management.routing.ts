import { Routes } from '@angular/router';
import { AgencyCategoryComponent } from './basic-setup/agency-category/agency-category.component';
import { PremiumFeaturesComponent } from './basic-setup/premium-features/premium-features.component';

export const AgencyManagementRoutes: Routes = [
    {
        path: 'categories',
        component: AgencyCategoryComponent,
        data: {
            title: 'Category Management',
            breadcrumb: 'Categories',
            roles: ['admin', 'super-admin']
        }
    },
    {
        path: 'premium-features',
        component: PremiumFeaturesComponent,
        data: {
            title: 'Category Management',
            breadcrumb: 'Categories',
            roles: ['admin', 'super-admin']
        }
    },
];