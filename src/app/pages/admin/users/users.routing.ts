import { Routes } from '@angular/router';

export const adminUsersRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
//   {
//     path: 'list',
//     loadComponent: () => import('../../../users/users.component').then(c => c.UsersComponent),
//     data: {
//       title: 'Users List',
//       breadcrumb: 'List',
//       roles: ['admin', 'super-admin']
//     }
//   },
//   {
//     path: 'create',
//     loadComponent: () => import('./user-create/user-create.component').then(c => c.UserCreateComponent),
//     data: {
//       title: 'Create User',
//       breadcrumb: 'Create',
//       roles: ['admin', 'super-admin']
//     }
//   },
//   {
//     path: 'edit/:id',
//     loadComponent: () => import('./user-edit/user-edit.component').then(c => c.UserEditComponent),
//     data: {
//       title: 'Edit User',
//       breadcrumb: (route: any) => `Edit ${route.params['id']}`,
//       roles: ['admin', 'super-admin']
//     }
//   },
//   {
//     path: 'roles',
//     loadComponent: () => import('./user-roles/user-roles.component').then(c => c.UserRolesComponent),
//     data: {
//       title: 'User Roles',
//       breadcrumb: 'Roles',
//       roles: ['admin', 'super-admin']
//     }
//   },
//   {
//     path: 'permissions',
//     loadComponent: () => import('./user-permissions/user-permissions.component').then(c => c.UserPermissionsComponent),
//     data: {
//       title: 'User Permissions',
//       breadcrumb: 'Permissions',
//       roles: ['super-admin']
//     }
//   }
];