import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private router: Router) { }
  logout() {
    // Implement logout logic here
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_roles');
    localStorage.removeItem('user_type');
    console.log('User logged out');
    this.router.navigate(['/auth/login']);
  }
}
