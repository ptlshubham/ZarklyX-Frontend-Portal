import { Component, inject, signal, Renderer2, DOCUMENT } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';

import { filter } from 'rxjs/operators';
import { MetronicInitService } from './core/services/metronic-init.service';

@Component({
  selector: 'body[app-root]',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ZarklyX-Frontend-Portal';

  private router = inject(Router);
  private document = inject(DOCUMENT);
  private renderer = inject(Renderer2);
  private metronicInitService = inject(MetronicInitService);

  private layoutClassMap: Record<string, string> = {
    // Regular user layout
    default: 'demo1 kt-sidebar-fixed kt-header-fixed',
    // Super admin layout (same base styling but can be extended)
    admin: 'demo1 kt-sidebar-fixed kt-header-fixed admin-theme',
  };
  private currentLayout = signal('default');

  constructor() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.updateDemo();
      this.metronicInitService.init();
    });
    this.updateDemo();
  }

  private updateDemo() {
    const url = this.router.url;
    
    // Determine layout type based on URL
    let layoutType = 'default';
    if (url.startsWith('/admin')) {
      layoutType = 'admin';
    }
    
    // Apply the appropriate layout styling
    this.currentLayout.set(layoutType);
    this.clearLayoutClasses();
    this.applyLayoutClass(this.layoutClassMap[layoutType]);
  }

  private clearLayoutClasses() {
    // Remove all possible layout classes from body
    Object.values(this.layoutClassMap).forEach(classString => {
      const classes = classString.split(' ');
      classes.forEach(className => {
        if (className.trim()) {
          this.renderer.removeClass(this.document.body, className.trim());
        }
      });
    });
  }

  private applyLayoutClass(classString: string) {
    const classes = classString.split(' ');
    classes.forEach(className => {
      if (className.trim()) {
        this.renderer.addClass(this.document.body, className.trim());
      }
    });
  }
}
