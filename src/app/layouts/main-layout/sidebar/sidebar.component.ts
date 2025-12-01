import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { MenuItem } from './menu.model';
import { MenuService } from './menu.service';
import { UserRole } from './menus';
declare var KTMenu: any;

@Component({
  selector: '[app-sidebar]',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  standalone: true

})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  menuItems: MenuItem[] = [];
  currentUrl: string = '';
  currentRole: UserRole = UserRole.AGENCY;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private menuService: MenuService
  ) {
    this.currentUrl = this.router.url;
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: any) => {
      this.currentUrl = event.urlAfterRedirects || event.url;
      setTimeout(() => this.expandActiveMenus(), 100);
    });
  }

  ngOnInit(): void {
    // Subscribe to menu changes based on user role
    this.menuService.menuItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(menu => {
        this.menuItems = menu;
        setTimeout(() => this.reinitializeMenu(), 100);
      });

    // Subscribe to role changes
    this.menuService.currentRole$
      .pipe(takeUntil(this.destroy$))
      .subscribe(role => {
        this.currentRole = role;
      });

    // Initialize menu based on user role
    // This should be set based on your authentication logic
    this.initializeUserRole();
  }

  ngAfterViewInit() {
    // Initialize Metronic menu
    setTimeout(() => {
      this.reinitializeMenu();
    }, 300);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initialize user role based on authentication
   * Replace this with your actual authentication logic
   */
  private initializeUserRole(): void {
    // Example: Get user role from auth service or local storage
    // const userRole = this.authService.getUserRole();
    
    // For now, we'll detect role based on current URL
    // debugger
    const url = this.router.url;
    let role: UserRole = UserRole.AGENCY;

    if (url.startsWith('/client')) {
      role = UserRole.AGENCY_CLIENT;
    } else if (url.startsWith('/employee')) {
      role = UserRole.AGENCY_EMPLOYEE;
    } else if (url.startsWith('/agency')) {
      role = UserRole.AGENCY;
    } else if (url.startsWith('/super-admin')) {
      role = UserRole.SUPER_ADMIN;
    } else if (url.startsWith('/influencer')) {
      role = UserRole.INFLUENCER;
    }

    this.menuService.setUserRole(role);
  }

  /**
   * Reinitialize Metronic menu after menu items change
   */
  private reinitializeMenu(): void {
    const menuElement = document.querySelector('#sidebar_menu');
    if (menuElement && typeof KTMenu !== 'undefined') {
      KTMenu.createInstances();
    }
    this.expandActiveMenus();
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