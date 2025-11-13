export interface RouteConfig {
  path: string;
  component?: any;
  loadChildren?: () => Promise<any>;
  canActivate?: any[];
  canLoad?: any[];
  data?: any;
  children?: RouteConfig[];
  title?: string;
  breadcrumb?: string;
  roles?: string[];
  permissions?: string[];
}

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'group' | 'collapsible';
  icon?: string;
  url?: string;
  badge?: {
    title: string;
    classes: string;
  };
  children?: NavigationItem[];
  roles?: string[];
  permissions?: string[];
  exactMatch?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  url?: string;
  disabled?: boolean;
}