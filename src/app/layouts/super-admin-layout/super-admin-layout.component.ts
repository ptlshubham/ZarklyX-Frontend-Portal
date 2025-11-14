import { Component, HostBinding, AfterViewInit, inject } from '@angular/core';
import { ThemeToggleComponent } from '../../partials/theme-toggle/theme-toggle.component';
import { SuperAdminSidebarComponent } from './sidebar/super-admin-sidebar.component';
import { SuperAdminHeaderComponent } from './header/super-admin-header.component';
import { FooterComponent } from '../main-layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MetronicInitService } from '../../core/services/metronic-init.service';

@Component({
	selector: 'app-super-admin-layout',
	imports: [RouterOutlet, ThemeToggleComponent, SuperAdminSidebarComponent, SuperAdminHeaderComponent, FooterComponent],
	templateUrl: './super-admin-layout.component.html',
	styleUrl: './super-admin-layout.component.scss'
})
export class SuperAdminLayoutComponent implements AfterViewInit {
	@HostBinding('class') class = 'flex grow';
	private metronicInitService = inject(MetronicInitService);

	ngAfterViewInit(): void {
		this.metronicInitService.init();
	}
}