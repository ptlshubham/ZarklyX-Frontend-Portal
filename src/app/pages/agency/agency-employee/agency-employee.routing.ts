import { Routes } from '@angular/router';
import { AddAgencyEmployeeComponent } from './add-agency-employee/add-agency-employee.component';


export const agencyEmployeeRoutes: Routes = [
    {
        path: 'add-employee',
        component: AddAgencyEmployeeComponent,
        data: {
            title: 'add employee',
            breadcrumb: 'add employee',
            roles: ['user', 'admin']
        }
    },

];
