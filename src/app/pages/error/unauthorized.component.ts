import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  template: `
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-red-600">403</h1>
        <p class="text-xl">Unauthorized Access</p>
        <p class="text-gray-600">You do not have permission to view this page.</p>
        <a routerLink="/dashboard" class="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Dashboard
        </a>
      </div>
    </div>
  `,
  imports: [RouterLink]
})
export class UnauthorizedComponent {}