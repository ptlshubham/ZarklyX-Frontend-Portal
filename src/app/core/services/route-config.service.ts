import { Injectable } from '@angular/core';
import { RouteConfig } from '../interfaces/route-config.interface';

@Injectable({
  providedIn: 'root'
})
export class RouteConfigService {

  // Route configurations organized by feature
  private routeConfigs: { [key: string]: RouteConfig[] } = {
    dashboard: [
      {
        path: 'overview',
        title: 'Dashboard Overview',
        breadcrumb: 'Overview',
        roles: ['user', 'admin', 'super-admin']
      },
      {
        path: 'analytics',
        title: 'Dashboard Analytics',
        breadcrumb: 'Analytics',
        roles: ['admin', 'super-admin']
      }
    ],
    users: [
      {
        path: 'list',
        title: 'Users List',
        breadcrumb: 'List',
        roles: ['admin', 'super-admin']
      },
      {
        path: 'create',
        title: 'Create User',
        breadcrumb: 'Create',
        roles: ['admin', 'super-admin']
      },
      {
        path: 'edit/:id',
        title: 'Edit User',
        breadcrumb: 'Edit User',
        roles: ['admin', 'super-admin']
      }
    ],
    admin: [
      {
        path: 'dashboard',
        title: 'Admin Dashboard',
        breadcrumb: 'Dashboard',
        roles: ['admin', 'super-admin']
      },
      {
        path: 'users',
        title: 'User Management',
        breadcrumb: 'Users',
        roles: ['admin', 'super-admin']
      }
    ],
    superAdmin: [
      {
        path: 'dashboard',
        title: 'Super Admin Dashboard',
        breadcrumb: 'Dashboard',
        roles: ['super-admin']
      },
      {
        path: 'system',
        title: 'System Management',
        breadcrumb: 'System',
        roles: ['super-admin']
      }
    ]
  };

  // Get route config by feature
  getRouteConfig(feature: string): RouteConfig[] {
    return this.routeConfigs[feature] || [];
  }

  // Generate route with guards
  generateSecureRoute(config: RouteConfig): any {
    const route: any = {
      path: config.path,
      data: {
        title: config.title,
        breadcrumb: config.breadcrumb,
        roles: config.roles,
        permissions: config.permissions
      }
    };

    if (config.component) {
      route.component = config.component;
    }

    if (config.loadChildren) {
      route.loadChildren = config.loadChildren;
    }

    if (config.canActivate) {
      route.canActivate = config.canActivate;
    }

    if (config.canLoad) {
      route.canLoad = config.canLoad;
    }

    if (config.children) {
      route.children = config.children.map(child => this.generateSecureRoute(child));
    }

    return route;
  }

  // Generate routes for a feature module
  generateFeatureRoutes(feature: string, guards: any[] = []): any[] {
    const configs = this.getRouteConfig(feature);
    return configs.map(config => {
      const route = this.generateSecureRoute(config);
      if (guards.length > 0) {
        route.canActivate = [...(route.canActivate || []), ...guards];
      }
      return route;
    });
  }

  // Route helper methods
  getRouteTitle(route: any): string {
    return route?.snapshot?.data?.title || 'ZarklyX Portal';
  }

  getRouteBreadcrumb(route: any): string {
    return route?.snapshot?.data?.breadcrumb || '';
  }

  getRouteRoles(route: any): string[] {
    return route?.snapshot?.data?.roles || [];
  }

  getRoutePermissions(route: any): string[] {
    return route?.snapshot?.data?.permissions || [];
  }

  // Validate route access
  canAccessRoute(routeRoles: string[], userRoles: string[]): boolean {
    if (!routeRoles || routeRoles.length === 0) {
      return true;
    }
    return routeRoles.some(role => userRoles.includes(role));
  }
}