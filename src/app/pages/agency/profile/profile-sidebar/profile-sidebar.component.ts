import { Component } from '@angular/core';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { CompanyProfileComponent } from '../company-profile/company-profile.component';
import { WebsiteLinksComponent } from "../website-links/website-links.component";
import { ChangePasswordComponent } from "../change-password/change-password.component";
import { IntegrationsComponent } from "../integrations/integrations.component";
import { SystemBannersComponent } from "../system-banners/system-banners.component";
import { SystemLogsComponent } from "../system-logs/system-logs.component";

@Component({
  selector: 'app-profile-sidebar',
  imports: [PersonalInfoComponent, CompanyProfileComponent, WebsiteLinksComponent, ChangePasswordComponent, IntegrationsComponent, SystemBannersComponent, SystemLogsComponent],
  templateUrl: './profile-sidebar.component.html',
  styleUrl: './profile-sidebar.component.scss'
})
export class ProfileSidebarComponent {
  activeTab: string = 'personal_info';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
