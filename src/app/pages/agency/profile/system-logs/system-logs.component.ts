import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-system-logs',
  templateUrl: './system-logs.component.html',
  styleUrls: ['./system-logs.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SystemLogsComponent implements OnInit {
  logs: any = [
    { id: 1, name: 'Tyler Hero', avatar: '/assets/media/avatars/300-3.png', browser: 'Chrome on Mac OS X', ip: '234.0.155.191', country: 'Estonia', flag: '/assets/media/flags/estonia.svg', activity: 'Current session' },
    { id: 2, name: 'Jane Smith', avatar: '/assets/media/avatars/300-23.png', browser: 'Chrome on Windows 7', ip: '70.218.212.162', country: 'Malaysia', flag: '/assets/media/flags/malaysia.svg', activity: 'Week ago' },
    { id: 3, name: 'Emma Johnson', avatar: '/assets/media/avatars/300-1.png', browser: 'Chrome on Mac OS X', ip: '140.92.152.213', country: 'Ukraine', flag: '/assets/media/flags/ukraine.svg', activity: 'Today, 9:53 am' },
    { id: 4, name: 'Michael Brown', avatar: '/assets/media/avatars/300-14.png', browser: 'Chrome on Windows 10', ip: '214.219.147.46', country: 'Canada', flag: '/assets/media/flags/canada.svg', activity: 'Current session' },
    { id: 5, name: 'Chloe Davis', avatar: '/assets/media/avatars/300-19.png', browser: 'Chrome on iOS 14', ip: '246.44.68.100', country: 'India', flag: '/assets/media/flags/india.svg', activity: 'Month ago' },
    { id: 6, name: 'William Wilson', avatar: '/assets/media/avatars/300-6.png', browser: 'Chrome on Windows 11', ip: '233.182.185.28', country: 'USA', flag: '/assets/media/flags/united-states.svg', activity: 'Today, 15:02' },
    { id: 7, name: 'Olivia Martin', avatar: '/assets/media/avatars/300-34.png', browser: 'Chrome on Android 16', ip: '76.216.214.248', country: 'Turkey', flag: '/assets/media/flags/turkey.svg', activity: 'Current session' },
    { id: 8, name: 'Ethan Garcia', avatar: '/assets/media/avatars/300-4.png', browser: 'Safari on Mac OS X', ip: '102.150.137.255', country: 'Brasil', flag: '/assets/media/flags/brazil.svg', activity: 'Current session' },
    { id: 9, name: 'Ava Rodriguez', avatar: '/assets/media/avatars/300-13.png', browser: 'Safari on Mac OS X', ip: '75.243.106.80', country: 'Latvia', flag: '/assets/media/flags/latvia.svg', activity: 'Week ago' },
    { id: 10, name: 'Matthew Martinez', avatar: '/assets/media/avatars/300-31.png', browser: 'Chrome on Mac OS X', ip: '214.219.147.46', country: 'Uruguay', flag: '/assets/media/flags/uruguay.svg', activity: 'Current session' }
  ];

  // UI state
  searchTerm = '';
  pageSize = 10;
  currentPage = 1;

  ngOnInit(): void { }

  // --- filtering & pagination ---

  get filteredLogs() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.logs;
    return this.logs.filter((l: any) =>
      l.name.toLowerCase().includes(term) ||
      l.browser.toLowerCase().includes(term) ||
      l.ip.toLowerCase().includes(term) ||
      l.country.toLowerCase().includes(term) ||
      l.activity.toLowerCase().includes(term)
    );
  }

  get paginatedLogs() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredLogs.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredLogs.length / this.pageSize));
  }

  // pages array for *ngFor
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // visible range helpers (use in template instead of Math.*)
  get visibleStart(): number {
    if (!this.filteredLogs.length) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get visibleEnd(): number {
    return Math.min(this.filteredLogs.length, this.currentPage * this.pageSize);
  }

  // checks whether all rows on the current page are selected
  get isAllSelected(): boolean {
    return this.paginatedLogs.length > 0 && this.paginatedLogs.every((r: any) => !!r.checked);
  }

  // --- selection helpers ---
  toggleSelectAll(checked: boolean) {
    this.paginatedLogs.forEach((row: any) => row.checked = checked);
  }

  toggleRowSelection(row: any, checked: boolean) {
    row.checked = checked;
  }

  selectedCount(): number {
    return this.logs.filter((l: any) => l.checked).length;
  }



  remove(row: any) {
    this.logs = this.logs.filter((l: any) => l.id !== row.id);
  }

  removeSelected() {
    this.logs = this.logs.filter((l: any) => !l.checked);
  }

  // --- pagination controls ---
  setPage(page: number) {
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;
    this.currentPage = page;
  }

  changePageSize(value: number | string) {
    const n = Number(value) || 1;
    this.pageSize = Math.max(1, n);
    this.currentPage = 1;
  }
}
