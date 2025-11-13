import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[app-super-admin-header]',
    templateUrl: './super-admin-header.component.html',

})
export class SuperAdminHeaderComponent {
    constructor(private router: Router) { }
    logout() {
        // Implement logout logic here
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_roles');
        localStorage.removeItem('user_type');
        console.log('User logged out');
        this.router.navigate(['/auth/login/super-admin']);
    }
}