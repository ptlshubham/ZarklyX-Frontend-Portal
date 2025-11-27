import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from './menu.model';
import { 
    agencyMenu, 
    agencyClientMenu, 
    agencyEmployeeMenu,
    UserRole 
} from './menus';

/**
 * MenuService - Manages sidebar menus based on user roles
 * 
 * This service provides a centralized way to manage different menu configurations
 * for different user roles (Agency, Client, Employee, etc.)
 * 
 * Usage:
 * 1. Inject the service in your component
 * 2. Call setUserRole() to set the current user's role
 * 3. Subscribe to menuItems$ to get the current menu
 */
@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private currentMenuSubject = new BehaviorSubject<MenuItem[]>(agencyMenu);
    private currentRoleSubject = new BehaviorSubject<UserRole>(UserRole.AGENCY);

    /**
     * Observable stream of current menu items
     */
    public menuItems$: Observable<MenuItem[]> = this.currentMenuSubject.asObservable();

    /**
     * Observable stream of current user role
     */
    public currentRole$: Observable<UserRole> = this.currentRoleSubject.asObservable();

    /**
     * Menu configuration map
     */
    private menuMap: Map<UserRole, MenuItem[]> = new Map([
        [UserRole.AGENCY, agencyMenu],
        [UserRole.AGENCY_CLIENT, agencyClientMenu],
        [UserRole.AGENCY_EMPLOYEE, agencyEmployeeMenu],
        // Add more roles as needed
        // [UserRole.SUPER_ADMIN, superAdminMenu],
        // [UserRole.INFLUENCER, influencerMenu],
    ]);

    constructor() {}

    /**
     * Set the current user role and update the menu accordingly
     * @param role - The user role
     */
    setUserRole(role: UserRole): void {
        const menu = this.menuMap.get(role);
        if (menu) {
            this.currentRoleSubject.next(role);
            this.currentMenuSubject.next(menu);
        } else {
            console.warn(`Menu not found for role: ${role}. Using default menu.`);
            this.currentMenuSubject.next(agencyMenu);
        }
    }

    /**
     * Get the current menu items synchronously
     * @returns Current menu items array
     */
    getCurrentMenu(): MenuItem[] {
        return this.currentMenuSubject.value;
    }

    /**
     * Get the current user role synchronously
     * @returns Current user role
     */
    getCurrentRole(): UserRole {
        return this.currentRoleSubject.value;
    }

    /**
     * Get menu for a specific role without changing the current menu
     * @param role - The user role
     * @returns Menu items for the specified role
     */
    getMenuByRole(role: UserRole): MenuItem[] | undefined {
        return this.menuMap.get(role);
    }

    /**
     * Register a new menu for a specific role
     * Useful for dynamically adding new role menus
     * @param role - The user role
     * @param menu - Menu items array
     */
    registerMenu(role: UserRole, menu: MenuItem[]): void {
        this.menuMap.set(role, menu);
    }

    /**
     * Check if a menu exists for a specific role
     * @param role - The user role
     * @returns True if menu exists, false otherwise
     */
    hasMenuForRole(role: UserRole): boolean {
        return this.menuMap.has(role);
    }

    /**
     * Get all available user roles
     * @returns Array of available user roles
     */
    getAvailableRoles(): UserRole[] {
        return Array.from(this.menuMap.keys());
    }

    /**
     * Filter menu items based on user permissions
     * @param permissions - Array of permission strings
     * @returns Filtered menu items
     */
    filterMenuByPermissions(permissions: string[]): MenuItem[] {
        const currentMenu = this.getCurrentMenu();
        return this.filterItems(currentMenu, permissions);
    }

    /**
     * Recursively filter menu items based on permissions
     */
    private filterItems(items: MenuItem[], permissions: string[]): MenuItem[] {
        return items
            .filter(item => {
                // If item has no role requirement, include it
                if (!item.role) return true;
                // Check if user has required permission
                return permissions.includes(item.role);
            })
            .map(item => {
                // If item has subitems, filter them recursively
                if (item.subItems && item.subItems.length > 0) {
                    return {
                        ...item,
                        subItems: this.filterItems(item.subItems, permissions)
                    };
                }
                return item;
            })
            .filter(item => {
                // Remove items with no subitems if all subitems were filtered out
                if (item.subItems) {
                    return item.subItems.length > 0 || item.link;
                }
                return true;
            });
    }

    /**
     * Search menu items by label
     * @param query - Search query
     * @returns Array of matching menu items
     */
    searchMenu(query: string): MenuItem[] {
        const currentMenu = this.getCurrentMenu();
        const lowerQuery = query.toLowerCase();
        return this.searchItems(currentMenu, lowerQuery);
    }

    /**
     * Recursively search menu items
     */
    private searchItems(items: MenuItem[], query: string): MenuItem[] {
        const results: MenuItem[] = [];
        
        items.forEach(item => {
            if (item.label.toLowerCase().includes(query)) {
                results.push(item);
            }
            if (item.subItems && item.subItems.length > 0) {
                results.push(...this.searchItems(item.subItems, query));
            }
        });

        return results;
    }
}
