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
    // Apply the main layout to all routes by default
    default: 'demo1 kt-sidebar-fixed kt-header-fixed',
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
    // Apply the default layout to all pages
    // This ensures any new page automatically gets the proper layout styling
    this.currentLayout.set('default');
    this.clearLayoutClasses();
    this.applyLayoutClass(this.layoutClassMap['default']);
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
