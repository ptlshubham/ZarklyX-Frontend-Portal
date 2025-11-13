# How to Add New Pages to ZarklyX

Your ZarklyX project is now configured so that **all new pages automatically inherit the main layout** (sidebar, header, footer, and styling). 

## ✅ Current Setup

- **Main Layout**: Automatically applied to all routes
- **Styling**: Demo1 theme styling preserved 
- **Navigation**: Sidebar and header included on all pages

## 🚀 How to Create a New Page

### Step 1: Create the Component
```bash
# Create a new component (example: settings page)
ng generate component pages/settings
```

Or manually create the file:
```typescript
// src/app/pages/settings/settings.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  imports: [],
  template: `
    <div class="container-fluid px-0">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Settings</h3>
        </div>
        <div class="card-body">
          <p>Your settings page content goes here...</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: []
})
export class SettingsComponent { }
```

### Step 2: Add to Routes
Add your new component to `src/app/app.routes.ts`:

```typescript
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: '',
    component: MainLayoutComponent, // This applies layout to ALL children
    children: [
      { path: 'dashboard', component: DashboardIndexComponent },
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent }, // ← New page!
      // Add more pages here - they all get the layout automatically!
    ],
  },
];
```

### Step 3: Add Navigation Link (Optional)
Add a sidebar link in `src/app/layouts/main-layout/sidebar/sidebar.component.html`:

```html
<div class="kt-menu-item">
  <a class="kt-menu-link border border-transparent items-center grow kt-menu-item-active:bg-accent/60 dark:menu-item-active:border-border kt-menu-item-active:rounded-lg hover:bg-accent/60 hover:rounded-lg gap-[14px] ps-[10px] pe-[10px] py-[8px]"
    routerLink="/settings" tabindex="0">
    <span class="kt-menu-bullet flex w-[6px] -start-[3px] rtl:start-0 relative before:absolute before:top-0 before:size-[6px] before:rounded-full rtl:before:translate-x-1/2 before:-translate-y-1/2 kt-menu-item-active:before:bg-primary kt-menu-item-hover:before:bg-primary">
    </span>
    <span class="kt-menu-title text-2sm font-normal text-foreground kt-menu-item-active:text-primary kt-menu-item-active:font-semibold kt-menu-link-hover:!text-primary">
      Settings
    </span>
  </a>
</div>
```

## 🎯 That's It!

Any new page you create will automatically have:
- ✅ Sidebar navigation
- ✅ Header with search, notifications, etc.
- ✅ Footer
- ✅ Demo1 theme styling
- ✅ Responsive layout
- ✅ All JavaScript functionality

## 📝 Example Pages You Can Create

- `/users` - User management
- `/settings` - Application settings  
- `/reports` - Analytics and reports
- `/profile` - User profile page
- `/products` - Product catalog
- `/orders` - Order management

Just follow the 3 steps above for each new page!

## 🔍 Test the Example

Your project already includes a test Users page at: `http://localhost:4200/users`

You can navigate between:
- Dashboard: `http://localhost:4200/dashboard` 
- Users: `http://localhost:4200/users`

Both pages automatically have the full layout applied!