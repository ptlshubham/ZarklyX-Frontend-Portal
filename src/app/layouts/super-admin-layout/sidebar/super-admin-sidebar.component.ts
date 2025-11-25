import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuItem } from './super-admin-menu.model';
import { superAdminMenu } from './super-admin-menu';
import { filter } from 'rxjs/operators';

declare var KTMenu: any;

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
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: any) => {
            this.currentUrl = event.urlAfterRedirects || event.url;
            setTimeout(() => this.expandActiveMenus(), 100);
        });
    }

    ngAfterViewInit() {
        // Initialize Metronic menu
        setTimeout(() => {
            const menuElement = document.querySelector('#sidebar_menu');
            if (menuElement && typeof KTMenu !== 'undefined') {
                KTMenu.createInstances();
            }
            this.expandActiveMenus();
        }, 300);
    }

    expandActiveMenus() {
        // Find and mark active menu items
        this.menuItems.forEach(item => {
            if (this.hasSubItems(item)) {
                const isActive = this.isChildRouteActive(item);
                const itemElement = document.querySelector(`[data-menu-id="${item.id}"]`);
                
                if (itemElement) {
                    if (isActive) {
                        itemElement.classList.add('kt-menu-item-show', 'kt-menu-item-here');
                    } else {
                        itemElement.classList.remove('kt-menu-item-show', 'kt-menu-item-here');
                    }
                }
            }
            
            // Check nested items (2nd level)
            if (item.subItems) {
                item.subItems.forEach(subItem => {
                    if (this.hasSubItems(subItem)) {
                        const isActive = this.isChildRouteActive(subItem);
                        const subItemElement = document.querySelector(`[data-menu-id="${subItem.id}"]`);
                        
                        if (subItemElement) {
                            if (isActive) {
                                subItemElement.classList.add('kt-menu-item-show', 'kt-menu-item-here');
                            } else {
                                subItemElement.classList.remove('kt-menu-item-show', 'kt-menu-item-here');
                            }
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
            return true;
        }
        
        // Check if any child route is active
        const childLinks = this.getChildLinks(item);
        return childLinks.some(link => this.currentUrl.startsWith(link));
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