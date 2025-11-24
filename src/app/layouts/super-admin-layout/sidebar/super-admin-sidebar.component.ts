import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuItem } from './menu.model';
import { superAdminMenu } from './menu';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-super-admin-sidebar',
    standalone: true,
    templateUrl: './super-admin-sidebar.component.html',
    imports: [RouterLink, RouterLinkActive, CommonModule],
})
export class SuperAdminSidebarComponent implements AfterViewInit {
    menuItems: MenuItem[] = superAdminMenu;
    currentUrl: string = '';

    constructor(private router: Router) {
        this.currentUrl = this.router.url;
        console.log('Initial URL:', this.currentUrl);
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: any) => {
            this.currentUrl = event.urlAfterRedirects || event.url;
            console.log('Navigation URL:', this.currentUrl);
            setTimeout(() => this.expandActiveMenus(), 100);
        });
    }

    ngAfterViewInit() {
        setTimeout(() => this.expandActiveMenus(), 200);
    }

    expandActiveMenus() {
        console.log('Expanding active menus for URL:', this.currentUrl);
        // Find all menu items that should be expanded
        this.menuItems.forEach(item => {
            if (this.hasSubItems(item) && this.isChildRouteActive(item)) {
                console.log(`Parent menu "${item.label}" (ID: ${item.id}) should be active`);
                const itemElement = document.querySelector(`[data-menu-id="${item.id}"]`);
                if (itemElement) {
                    itemElement.classList.add('kt-menu-item-show', 'kt-menu-item-here');
                    console.log(`Added classes to parent menu "${item.label}"`);
                }
            }
            // Check nested items
            if (item.subItems) {
                item.subItems.forEach(subItem => {
                    if (this.hasSubItems(subItem) && this.isChildRouteActive(subItem)) {
                        console.log(`Sub menu "${subItem.label}" (ID: ${subItem.id}) should be active`);
                        const subItemElement = document.querySelector(`[data-menu-id="${subItem.id}"]`);
                        if (subItemElement) {
                            subItemElement.classList.add('kt-menu-item-show', 'kt-menu-item-here');
                            console.log(`Added classes to sub menu "${subItem.label}"`);
                        }
                    }
                });
            }
        });
    }

    hasSubItems(item: MenuItem): boolean {
        return !!item.subItems && item.subItems.length > 0;
    }

    isMenuItemWithBadge(item: MenuItem): boolean {
        return !!item.badge && !item.link && !this.hasSubItems(item);
    }

    // Check if any child route is currently active
    isChildRouteActive(item: MenuItem): boolean {
        if (!this.currentUrl) return false;
        
        // Check if item itself has the active link
        if (item.link && this.currentUrl.startsWith(item.link)) {
            console.log(`✓ Item "${item.label}" is active (direct link match)`);
            return true;
        }
        
        // Check if any child route is active
        const childLinks = this.getChildLinks(item);
        const isActive = childLinks.some(link => this.currentUrl.startsWith(link));
        
        if (isActive) {
            console.log(`✓ Item "${item.label}" is active (child link match). Child links:`, childLinks);
        }
        
        return isActive;
    }
    
    // Check if specific link is active (exact match)
    isLinkActive(link: string): boolean {
        if (!link) return false;
        return this.currentUrl === link;
    }

    // Get all child links recursively
    getChildLinks(item: MenuItem): string[] {
        const links: string[] = [];
        if (item.link) links.push(item.link);
        if (item.subItems) {
            item.subItems.forEach(sub => {
                links.push(...this.getChildLinks(sub));
            });
        }
        return links;
    }
}