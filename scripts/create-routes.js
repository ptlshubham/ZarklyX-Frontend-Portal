#!/usr/bin/env node

/**
 * Routing System Expansion Guide
 * 
 * This script demonstrates how to easily add new routes to the system
 * Run this script to generate new routing files and components
 */

const fs = require('fs');
const path = require('path');

const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const createComponent = (componentName, componentPath) => {
  const componentTemplate = `import { Component } from '@angular/core';

@Component({
  selector: 'app-${componentName.toLowerCase()}',
  standalone: true,
  template: \`
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">${componentName}</h1>
      <p>This is the ${componentName.toLowerCase()} component.</p>
    </div>
  \`,
  imports: []
})
export class ${componentName}Component {}`;

  fs.writeFileSync(componentPath, componentTemplate);
  console.log(`✅ Created component: ${componentPath}`);
};

const createRoutingFile = (feature, routes, routingPath) => {
  const routingTemplate = `import { Routes } from '@angular/router';

export const ${feature}Routes: Routes = [
${routes.map(route => `  {
    path: '${route.path}',
    ${route.component ? `loadComponent: () => import('./${route.path}/${route.path}.component').then(c => c.${route.component}Component),` : `redirectTo: '${route.redirectTo}',
    pathMatch: 'full'`}
    data: {
      title: '${route.title}',
      breadcrumb: '${route.breadcrumb}',
      roles: ${JSON.stringify(route.roles || ['user', 'admin', 'super-admin'])}
    }
  }`).join(',\n')}
];`;

  fs.writeFileSync(routingPath, routingTemplate);
  console.log(`✅ Created routing file: ${routingPath}`);
};

// Example: Create a new feature module
const createFeatureModule = (featureName, routes) => {
  const featureDir = `src/app/pages/${featureName}`;
  createDirectory(featureDir);

  // Create routing file
  const routingPath = path.join(featureDir, `${featureName}.routing.ts`);
  createRoutingFile(featureName, routes, routingPath);

  // Create components
  routes.forEach(route => {
    if (route.component) {
      const componentDir = path.join(featureDir, route.path);
      createDirectory(componentDir);
      const componentPath = path.join(componentDir, `${route.path}.component.ts`);
      createComponent(route.component, componentPath);
    }
  });

  console.log(`🎉 Feature module '${featureName}' created successfully!`);
  console.log(`📝 Don't forget to add the route to app.routes.ts:`);
  console.log(`
  {
    path: '${featureName}',
    loadChildren: () => import('./pages/${featureName}/${featureName}.routing').then(m => m.${featureName}Routes),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      title: '${featureName.charAt(0).toUpperCase() + featureName.slice(1)}',
      breadcrumb: '${featureName.charAt(0).toUpperCase() + featureName.slice(1)}',
      roles: ['user', 'admin', 'super-admin']
    }
  }
  `);
};

// Example usage:
console.log('🚀 Angular Routing System Expansion Tool');
console.log('========================================');

// Example: Create a reports module
const reportsRoutes = [
  { path: '', redirectTo: 'analytics' },
  { path: 'analytics', component: 'Analytics', title: 'Analytics', breadcrumb: 'Analytics' },
  { path: 'sales', component: 'Sales', title: 'Sales Reports', breadcrumb: 'Sales' },
  { path: 'users', component: 'UserReports', title: 'User Reports', breadcrumb: 'User Reports' }
];

// Uncomment to create the reports module
// createFeatureModule('reports', reportsRoutes);

console.log('📚 Available Commands:');
console.log('1. createFeatureModule(name, routes) - Creates a complete feature module');
console.log('2. createComponent(name, path) - Creates a standalone component');
console.log('3. createRoutingFile(feature, routes, path) - Creates a routing file');

console.log('\n💡 Example: To create a new settings module:');
console.log(`
const settingsRoutes = [
  { path: '', redirectTo: 'general' },
  { path: 'general', component: 'General', title: 'General Settings', breadcrumb: 'General' },
  { path: 'security', component: 'Security', title: 'Security Settings', breadcrumb: 'Security' },
  { path: 'notifications', component: 'Notifications', title: 'Notifications', breadcrumb: 'Notifications' }
];

createFeatureModule('settings', settingsRoutes);
`);

module.exports = {
  createFeatureModule,
  createComponent,
  createRoutingFile,
  createDirectory
};