import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { WidgetsComponent } from '../../../pages/influencer/widgets/widgets/widgets.component';
import { DashboardServiceService } from '../../../pages/influencer/widgets/dashboard-service.service';

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  imports: [WidgetsComponent],
})
export class HeaderComponent {
  constructor(private router: Router) { 
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.checkInfluencerRoute(event.urlAfterRedirects);
      });}
  logout() {
    // Implement logout logic here
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_roles');
    localStorage.removeItem('user_type');
    console.log('User logged out');
    this.router.navigate(['/auth/login']);
  }
  goToProfile() {
    this.router.navigate(['/profile']);
  }
  
  isInfluencerPage = true;
  private checkInfluencerRoute(url: string) {
    this.isInfluencerPage = url === '/influencer';
  }
  
  widgetsService = inject(DashboardServiceService);

  isWidgetsOpen = false;
}