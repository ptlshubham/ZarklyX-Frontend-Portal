import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DashboardServiceService } from '../../../pages/infulencer/widgets/dashboard-service.service';
import { WidgetsComponent } from "../../../pages/infulencer/widgets/widgets/widgets.component";

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