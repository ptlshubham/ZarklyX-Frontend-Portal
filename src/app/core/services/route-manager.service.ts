import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, filter, map } from 'rxjs';
import { BreadcrumbItem } from '../interfaces/route-config.interface';

@Injectable({
  providedIn: 'root'
})
export class RouteManagerService {
  private breadcrumbsSubject = new BehaviorSubject<BreadcrumbItem[]>([]);
  public breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  private currentRouteDataSubject = new BehaviorSubject<any>({});
  public currentRouteData$ = this.currentRouteDataSubject.asObservable();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute)
      )
      .subscribe(() => {
        this.updateBreadcrumbs();
        this.updateCurrentRouteData();
      });
  }

  private updateBreadcrumbs(): void {
    const breadcrumbs: BreadcrumbItem[] = [];
    let route = this.activatedRoute.root;

    while (route) {
      if (route.snapshot.data['breadcrumb']) {
        const breadcrumbData = route.snapshot.data['breadcrumb'];
        const url = this.createRouteUrl(route);
        
        breadcrumbs.push({
          label: typeof breadcrumbData === 'function' ? breadcrumbData(route.snapshot) : breadcrumbData,
          url: url,
          disabled: route.snapshot.data['breadcrumbDisabled'] || false
        });
      }
      route = route.firstChild!;
    }

    this.breadcrumbsSubject.next(breadcrumbs);
  }

  private updateCurrentRouteData(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild!;
    }
    this.currentRouteDataSubject.next(route.snapshot.data);
  }

  private createRouteUrl(route: ActivatedRoute): string {
    const segments: string[] = [];
    let currentRoute: ActivatedRoute | null = this.activatedRoute.root;

    while (currentRoute && currentRoute !== route.parent) {
      if (currentRoute.snapshot.url.length > 0) {
        segments.push(...currentRoute.snapshot.url.map(segment => segment.path));
      }
      currentRoute = currentRoute.firstChild;
    }

    return '/' + segments.join('/');
  }

  // Navigation helpers
  navigateToRoute(path: string | string[], extras?: any): Promise<boolean> {
    return this.router.navigate(Array.isArray(path) ? path : [path], extras);
  }

  navigateRelative(commands: any[], route: ActivatedRoute = this.activatedRoute): Promise<boolean> {
    return this.router.navigate(commands, { relativeTo: route });
  }

  // Route data helpers
  getCurrentRouteData(): any {
    return this.currentRouteDataSubject.value;
  }

  hasPermission(requiredRoles: string[], userRoles: string[]): boolean {
    return requiredRoles.some(role => userRoles.includes(role));
  }

  // URL helpers
  isRouteActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  getRouteParams(): any {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.params;
  }

  getQueryParams(): any {
    return this.activatedRoute.snapshot.queryParams;
  }
}