import { Routes } from '@angular/router';
import { InfluencerCategoryComponent } from './influencer-category/influencer-category.component';

export const InfluencerManagementRoutes: Routes = [
    {
        path: 'categories',
        component: InfluencerCategoryComponent,
        data: {
            title: 'Category Management',
            breadcrumb: 'Categories',
            roles: ['admin', 'super-admin']
        }
    },
];