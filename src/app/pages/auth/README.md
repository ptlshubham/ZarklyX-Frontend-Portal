# Auth Layout System Documentation

## Overview

This system ensures that **any component created in the `/auth` folder automatically gets a full-screen layout** and is **not affected by the main application layout** (sidebars, headers, footers, etc.).

## How It Works

### 1. Universal Auth Layout (`auth-layout.scss`)
- All auth components inherit full-screen layout styles
- Overrides any potential layout interference from parent components
- Provides consistent styling for auth cards and backgrounds
- Supports both light and dark themes

### 2. Base Auth Component (`base-auth.component.ts`)
- Abstract base class that all auth components should extend
- Automatically hides layout elements when auth page loads
- Restores layout elements when leaving auth pages
- Manages body classes and overflow for proper display

### 3. Standardized Classes
- `auth-page-bg`: Full-screen background with proper theming
- `auth-card`: Consistent card styling with glass effect
- `auth-content`: Proper content padding and spacing

## How to Create New Auth Components

### Step 1: Create Component
```bash
ng g c pages/auth/your-new-auth-component
```

### Step 2: Update Component Class
```typescript
import { Component, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BaseAuthComponent } from '../base-auth.component';

@Component({
  selector: 'app-your-new-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './your-new-auth.component.html',
  styleUrls: ['../auth-layout.scss', './your-new-auth.component.scss'] // Include auth-layout.scss first
})
export class YourNewAuthComponent extends BaseAuthComponent {
  
  constructor(
    // Your services here
    renderer: Renderer2,
    @Inject(DOCUMENT) document: Document
  ) {
    super(renderer, document); // Always call super
  }
  
  // Your component logic here
}
```

### Step 3: Update Template
```html
<div class="auth-page-bg">
  <div class="auth-card">
    <div class="auth-content">
      <!-- Your form content here -->
    </div>
  </div>
</div>
```

### Step 4: Add to Routing
```typescript
// In auth.routing.ts
{
  path: 'your-route',
  loadComponent: () => import('./your-new-auth/your-new-auth.component').then(c => c.YourNewAuthComponent),
  data: {
    title: 'Your Auth Page',
    breadcrumb: 'Your Auth'
  }
}
```

## Features

### ✅ Automatic Full-Screen Layout
- No sidebars, headers, or footers
- Complete viewport coverage
- High z-index to ensure prominence

### ✅ Theme Support
- Light/dark mode backgrounds
- Consistent card styling across themes
- Proper color schemes

### ✅ Layout Isolation
- Completely independent from main app layout
- No inherited layout constraints
- Clean authentication experience

### ✅ Responsive Design
- Works on all screen sizes
- Proper mobile spacing
- Adaptive padding

### ✅ Glass Morphism Effect
- Semi-transparent cards with backdrop blur
- Modern visual aesthetic
- Proper shadows and borders

## Benefits

1. **No Layout Interference**: Auth pages are completely separate from main layout
2. **Consistent Experience**: All auth pages look and behave the same way
3. **Easy Maintenance**: One place to update auth styling
4. **Future-Proof**: New auth components automatically inherit the system
5. **Theme Consistency**: Automatic light/dark mode support

## Current Auth Components

- `main-login` - Standard user login
- `influencer-login` - Influencer-specific login with purple/pink theme
- `super-admin-login` - Admin login with dark security theme

All components now use this standardized system and will display with full-screen layout regardless of the main application's layout state.