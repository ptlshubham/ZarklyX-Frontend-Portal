import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface User {
  id: string;
  email: string;
  username?: string;
  adminId?: string;
  roles: string[];
  userType: 'main' | 'influencer' | 'super-admin' | 'client';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router,
    private httpClient: HttpClient) {
    // Check if user is already logged in
    this.loadUserFromStorage();
  }

  loadUserFromStorage(): void {
    const token = localStorage.getItem('auth_token');
    const roles = JSON.parse(localStorage.getItem('user_roles') || '[]');
    const userType = localStorage.getItem('user_type') as any;

    if (token && roles.length > 0 && userType) {
      const user: User = {
        id: localStorage.getItem('user_id') || 'user-id',
        email: localStorage.getItem('user_email') || '',
        username: localStorage.getItem('user_username') || '',
        adminId: localStorage.getItem('user_admin_id') || '',
        roles: roles,
        userType: userType
      };
      this.currentUserSubject.next(user);
    }
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('auth_token') !== null;
  }

  getUserRoles(): string[] {
    return JSON.parse(localStorage.getItem('user_roles') || '[]');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const userRoles = this.getUserRoles();
    return userRoles.includes(role);
  }

  hasPermission(permission: string): boolean {
    const userPermissions = JSON.parse(localStorage.getItem('user_permissions') || '[]');
    return userPermissions.includes(permission);
  }

  login(credentials: any, userType: 'main' | 'influencer' | 'super-admin'): Observable<any> {
    // Mock login - replace with actual API call
    if (userType == 'main')
      return this.httpClient.post(ApiService.MainLoginURL, credentials);

    return new Observable(observer => {
      setTimeout(() => {
        if (this.validateCredentials(credentials, userType)) {
          const user = this.createUser(credentials, userType);
          this.setUserSession(user);
          this.currentUserSubject.next(user);
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, 1000); // Simulate API delay
    });
  }

  loginWithGoogle(data: any): Observable<any> {
    return this.httpClient.post(ApiService.GoogleLoginURL, data);
  }
  sinupWithGoogle(data: any): Observable<any> {
    return this.httpClient.post(ApiService.GoogleSignupURL, data);
  }
  verifyGoogleToken(data: any): Observable<any> {
    return this.httpClient.post(ApiService.GoogleVerifyURL, data);
  }

  verifyLoginOtp(credentials: any): Observable<any> {
    return this.httpClient.post(ApiService.VerifyLoginOtpURL, credentials);
  }

  registerAccount(data: any): Observable<any> {
    return this.httpClient.post(ApiService.RegisterUserURL, data);
  }

  verifyRegisterOtp(data: any) {
    return this.httpClient.post(ApiService.VerifyRegisterOtpURL, data);
  }
  sendOtp(data: any): Observable<any> {
    return this.httpClient.post(ApiService.SendLoginOtpURL, data)
  }
  resendOtp(data: any) {
    return this.httpClient.post(ApiService.ResendOtpURL, data)
  }

  registerCategory(data: any) {
    return this.httpClient.post(ApiService.RegisterCategoryURL, data);
  }

  registerUserType(data: any) {
    return this.httpClient.post(ApiService.RegisterUserTypeURL, data);
  }

  registerCompanyDetails(data: any) {
    return this.httpClient.post(ApiService.RegisterCompanyDetailsURL, data)
  }

  registerFinalStep(data: any) {
    return this.httpClient.post(ApiService.RegisterFinalStepURL, data);
  }

  logout(): void {
    // Clear all auth data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_roles');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_username');
    localStorage.removeItem('user_admin_id');
    localStorage.removeItem('user_permissions');
    localStorage.removeItem('user_id');
    localStorage.removeItem('company_id');
    localStorage.removeItem('dashboard_widgets');

    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  private validateCredentials(credentials: any, userType: string): boolean {
    // Fake credentials for testing
    const fakeCredentials = {
      main: [
        { email: 'user@example.com', password: 'password' },
        { email: 'john@example.com', password: '123456' },
        { email: 'admin@company.com', password: 'admin123' },
        { email: 'test@test.com', password: 'test' }
      ],
      influencer: [
        { username: 'influencer1', password: 'password' },
        { username: 'content_creator', password: '123456' },
        { username: 'social_star', password: 'influencer123' },
        { username: 'demo_user', password: 'demo' }
      ],
      'super-admin': [
        { adminId: 'admin001', password: 'supersecret', securityCode: '2FA123' },
        { adminId: 'root', password: 'rootpass', securityCode: 'SEC456' },
        { adminId: 'superuser', password: 'admin123', securityCode: 'AUTH789' },
        { adminId: 'sa001', password: 'password', securityCode: '123456' }
      ]
    };

    // Check against fake credentials
    switch (userType) {
      case 'main':
        return fakeCredentials.main.some(cred =>
          cred.email === credentials.email && cred.password === credentials.password
        );
      case 'influencer':
        return fakeCredentials.influencer.some(cred =>
          cred.username === credentials.username && cred.password === credentials.password
        );
      case 'super-admin':
        return fakeCredentials['super-admin'].some(cred =>
          cred.adminId === credentials.adminId &&
          cred.password === credentials.password &&
          cred.securityCode === credentials.securityCode
        );
      default:
        return false;
    }
  }

  private createUser(credentials: any, userType: 'main' | 'influencer' | 'super-admin' | 'client'): User {
    const roleMap = {
      'main': ['user'],
      'influencer': ['influencer'],
      'super-admin': ['super-admin', 'admin'],
      'client': ['client']
    };

    return {
      id: `${userType}-${Date.now()}`,
      email: credentials.email || `${credentials.username || credentials.adminId}@example.com`,
      username: credentials.username,
      adminId: credentials.adminId,
      roles: roleMap[userType],
      userType: userType
    };
  }

  private setUserSession(user: User): void {
    const token = `${user.userType}-token-${Date.now()}`;

    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_roles', JSON.stringify(user.roles));
    localStorage.setItem('user_type', user.userType);
    localStorage.setItem('user_email', user.email);

    if (user.username) {
      localStorage.setItem('user_username', user.username);
    }
    if (user.adminId) {
      localStorage.setItem('user_admin_id', user.adminId);
    }

    // Set permissions based on role
    const permissions = this.getPermissionsForRoles(user.roles);
    localStorage.setItem('user_permissions', JSON.stringify(permissions));
  }

  private getPermissionsForRoles(roles: string[]): string[] {
    const permissionMap: { [key: string]: string[] } = {
      'user': ['read:dashboard', 'read:profile'],
      'influencer': ['read:dashboard', 'read:profile', 'manage:content', 'read:analytics'],
      'admin': ['read:dashboard', 'read:users', 'write:users', 'read:reports'],
      'super-admin': ['*'], // All permissions
      'client': ['read:dashboard', 'read:profile']
    };

    const permissions = new Set<string>();
    roles.forEach(role => {
      if (permissionMap[role]) {
        permissionMap[role].forEach(permission => permissions.add(permission));
      }
    });

    return Array.from(permissions);
  }

  // Redirect user to appropriate dashboard based on role
  redirectToUserDashboard(): void {
    const user = this.getCurrentUser();
    if (!user) {
      this.router.navigate(['/auth/login']);
      return;
    }

    console.log(`Redirecting ${user.userType} user to dashboard...`);

    switch (user.userType) {
      case 'main':
        this.router.navigate(['/dashboard']);
        break;
      case 'influencer':
        this.router.navigate(['/influencer']);
        break;
      case 'super-admin':
        this.router.navigate(['/super-admin']);
        break;
      case 'client':
        this.router.navigate(['/client']);
        break;
      default:
        this.router.navigate(['/dashboard']);
    }
  }
}