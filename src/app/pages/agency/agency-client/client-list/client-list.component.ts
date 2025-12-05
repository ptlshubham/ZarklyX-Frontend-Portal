import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../../core/services/client.service';

@Component({
  selector: 'app-client-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit {
  clients: any[] = [];
  loading = false;
  companyId: any = localStorage.getItem('company_id');

  constructor(
    private clientService: ClientService,
    private router: Router) { }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.loading = true;
    // If explicit company_id not set in localStorage, try to read it from the stored `clientData` object
    if (!this.companyId) {
      const clientDataRaw = localStorage.getItem('clientData');
      if (clientDataRaw) {
        try {
          const clientData = JSON.parse(clientDataRaw);
          this.companyId = clientData?.companyId || clientData?.company_id || this.companyId;
          if (this.companyId) {
            // persist for other components
            localStorage.setItem('company_id', this.companyId);
          }
        } catch (err) {
          // ignore parsing errors
        }
      }
    }

    if (this.companyId) {
      this.clientService.getAllClientsByCompanyId(this.companyId).subscribe({
        next: (response: any) => {
          this.clients = response.data || [];
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching clients:', error);
          this.loading = false;
        }
      });
    } else {
      console.error('Company ID not found in localStorage');
      this.loading = false;
    }
  }

  editClient(client: any) {
    this.router.navigate(['/agency/agency-clients/add-client'], { state: { client } });
  }
}
