import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuItem } from './menu.model';
import { superAdminMenu } from './menu';

@Component({
    selector: 'app-super-admin-sidebar',
    templateUrl: './super-admin-sidebar.component.html',
    imports: [RouterLink, RouterLinkActive, CommonModule],
})
export class SuperAdminSidebarComponent {
    menuItems: MenuItem[] = superAdminMenu;

    hasSubItems(item: MenuItem): boolean {
        return !!item.subItems && item.subItems.length > 0;
    }

    isMenuItemWithBadge(item: MenuItem): boolean {
        return !!item.badge && !item.link && !this.hasSubItems(item);
    }
}