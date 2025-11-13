import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiredRoles = route.data['roles'] as string[];
    const userRoles = this.getUserRoles();

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const hasAccess = requiredRoles.some(role => userRoles.includes(role));

    if (!hasAccess) {
      // Redirect based on user role
      if (userRoles.includes('super-admin')) {
        this.router.navigate(['/super-admin']);
      } else if (userRoles.includes('admin')) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    }

    return hasAccess;
  }

  private getUserRoles(): string[] {
    // Replace with actual role retrieval logic
    return JSON.parse(localStorage.getItem('user_roles') || '["user"]');
  }
}