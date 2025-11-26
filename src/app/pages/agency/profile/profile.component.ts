import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileSidebarComponent } from './profile-sidebar/profile-sidebar.component';

@Component({
    selector: 'app-profile',
    imports: [ProfileSidebarComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}