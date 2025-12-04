import { Injectable, inject } from '@angular/core';
import { CanActivate, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Authentication Guard
 * Verifies JWT token from localStorage
 * Blocks access if token is missing or invalid
 * Similar to backend authMiddleware
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  private router = inject(Router);
  private authService = inject(AuthService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAccess(route.data, state.url);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    const url = `/${segments.map(s => s.path).join('/')}`;
    return this.checkAccess(route.data || {}, url);
  }

  private checkAccess(routeData: any, url: string): boolean {
    try {
      // Verify token exists
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        console.warn('No authentication token found');
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: url } });
        return false;
      }

      // Verify user is authenticated
      if (!this.authService.isAuthenticated()) {
        console.warn('User is not authenticated');
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: url } });
        return false;
      }

      // Get current user
      const user = this.authService.getCurrentUser();
      if (!user) {
        console.warn('No user information available');
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: url } });
        return false;
      }

      // Check required roles if specified
      const requiredRoles = routeData['roles'] as string[];
      if (requiredRoles && requiredRoles.length > 0) {
        if (!this.hasRequiredRoles(requiredRoles)) {
          console.warn(`User does not have required roles: ${requiredRoles.join(', ')}`);
          this.router.navigate(['/error/403']);
          return false;
        }
      }

      // Check required permissions if specified
      const requiredPermissions = routeData['permissions'] as string[];
      if (requiredPermissions && requiredPermissions.length > 0) {
        if (!this.hasRequiredPermissions(requiredPermissions)) {
          console.warn(`User does not have required permissions: ${requiredPermissions.join(', ')}`);
          this.router.navigate(['/error/403']);
          return false;
        }
      }

      // Check user type if specified
      const requiredUserType = routeData['userType'] as string;
      if (requiredUserType && user.userType !== requiredUserType) {
        console.warn(`User type mismatch. Required: ${requiredUserType}, Actual: ${user.userType}`);
        this.router.navigate(['/error/403']);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Authentication error:', error);
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

  private hasRequiredRoles(requiredRoles: string[]): boolean {
    const userRoles = this.authService.getUserRoles();
    return requiredRoles.some(role => userRoles.includes(role));
  }

  private hasRequiredPermissions(requiredPermissions: string[]): boolean {
    return requiredPermissions.every(permission => 
      this.authService.hasPermission(permission)
    );
  }
}

/**
 * Optional Authentication Guard
 * Verifies JWT token if provided, but doesn't block if missing
 * Similar to backend optionalAuthMiddleware
 * Useful for routes that can work with or without authentication
 */
@Injectable({
  providedIn: 'root'
})
export class OptionalAuthGuard implements CanActivate {
  private authService = inject(AuthService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    try {
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        // Token not provided, continue without user
        console.log('No token provided, allowing access without authentication');
        return true;
      }

      // Token exists, verify it
      if (!this.authService.isAuthenticated()) {
        console.log('Token verification failed, allowing access without authentication');
        // Token verification failed, continue without user
        return true;
      }

      // Token is valid, user information is already loaded
      console.log('User authenticated, proceeding with user context');
      return true;
    } catch (error) {
      // Token verification failed, continue without user
      console.log('Authentication error, allowing access without authentication:', error);
      return true;
    }
  }
}