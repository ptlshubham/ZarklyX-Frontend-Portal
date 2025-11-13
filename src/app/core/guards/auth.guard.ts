import { Injectable, inject } from '@angular/core';
import { CanActivate, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';

// You'll need to create an AuthService that manages user authentication
interface AuthService {
  isAuthenticated(): boolean;
  getUserRoles(): string[];
  hasRole(role: string): boolean;
  hasPermission(permission: string): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  private router = inject(Router);
  // Inject your actual AuthService here
  // private authService = inject(AuthService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAccess(route.data);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAccess(route.data || {});
  }

  private checkAccess(routeData: any): boolean {
    // Mock implementation - replace with actual auth logic
    const isAuthenticated = this.isUserAuthenticated();
    
    if (!isAuthenticated) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    const requiredRoles = routeData['roles'] as string[];
    const requiredPermissions = routeData['permissions'] as string[];

    if (requiredRoles && !this.hasRequiredRoles(requiredRoles)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    if (requiredPermissions && !this.hasRequiredPermissions(requiredPermissions)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }

  // Mock methods - replace with actual implementation
  private isUserAuthenticated(): boolean {
    // Replace with actual authentication check
    return localStorage.getItem('auth_token') !== null;
  }

  private hasRequiredRoles(requiredRoles: string[]): boolean {
    // Replace with actual role checking logic
    const userRoles = JSON.parse(localStorage.getItem('user_roles') || '[]');
    return requiredRoles.some(role => userRoles.includes(role));
  }

  private hasRequiredPermissions(requiredPermissions: string[]): boolean {
    // Replace with actual permission checking logic
    const userPermissions = JSON.parse(localStorage.getItem('user_permissions') || '[]');
    return requiredPermissions.some(permission => userPermissions.includes(permission));
  }
}