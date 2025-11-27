import { MenuItem } from '../menu.model';

/**
 * Menu configuration index
 * All menu configurations are exported from this file for easy management
 */

export { agencyMenu } from './agency.menu';
export { agencyClientMenu } from './agency-client.menu';
export { agencyEmployeeMenu } from './agency-employee.menu';

/**
 * User Role Enum for type safety
 */
export enum UserRole {
    AGENCY = 'agency',
    AGENCY_CLIENT = 'agency_client',
    AGENCY_EMPLOYEE = 'agency_employee',
    SUPER_ADMIN = 'super_admin',
    INFLUENCER = 'influencer'
}

/**
 * Menu Map - Maps user roles to their respective menu configurations
 */
export const MENU_MAP: Record<UserRole, MenuItem[]> = {
    [UserRole.AGENCY]: [], // Will be populated from agency.menu.ts
    [UserRole.AGENCY_CLIENT]: [], // Will be populated from agency-client.menu.ts
    [UserRole.AGENCY_EMPLOYEE]: [], // Will be populated from agency-employee.menu.ts
    [UserRole.SUPER_ADMIN]: [], // Can be added later
    [UserRole.INFLUENCER]: [] // Can be added later
};
