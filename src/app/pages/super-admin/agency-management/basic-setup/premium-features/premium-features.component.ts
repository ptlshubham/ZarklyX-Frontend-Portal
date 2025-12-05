import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { SignupSetting } from '../../../../../core/services/super-admin/signup-setting.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../../core/services/toast.service';
import { ModalService } from '../../../../../core/services/modal.service';
import { SearchService } from '../../../../../core/services/search.service';

@Component({
  selector: 'app-premium-features',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './premium-features.component.html',
  styleUrl: './premium-features.component.scss'
})
export class PremiumFeaturesComponent {
  premiumFeatures: any[] = [];
  filteredPremiumFeatures: any[] = [];
  paginateData: any[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm: string = '';

  addPremiumFeaturesForm!: FormGroup;
  submitted = false;
  isUpdateMode = false;
  updatePremiumFeatureId: any = null;

  constructor(
    private signupSetting: SignupSetting,
    private fb: FormBuilder,
    private toastService: ToastService,
    private modalService: ModalService,
    private searchService: SearchService
  ) {
    this.addPremiumFeaturesForm = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    });
    this.getAllpremiumFeatures();

  }

  get f() { return this.addPremiumFeaturesForm.controls; }

  getAllpremiumFeatures() {
    this.signupSetting.getAllPremiumFeatures().subscribe({
      next: res => {
        this.premiumFeatures = (res.data || []).map((premiumFeatures: any, index: number) => ({
          ...premiumFeatures,
          index: index + 1
        }));
        this.filteredPremiumFeatures = [...this.premiumFeatures];
        this.collectionSize = this.filteredPremiumFeatures.length;
        this.refreshPagination();
      },
      error: err => console.error(err)
    });
  }

  refreshPagination() {
    this.paginateData = this.searchService.paginate(this.filteredPremiumFeatures, this.page, this.pageSize);
  }

  sortData(column: string) {
    this.sortDirection = this.searchService.toggleSortDirection(this.sortColumn, column, this.sortDirection);
    this.sortColumn = column;
    this.filteredPremiumFeatures = this.searchService.sort(this.filteredPremiumFeatures, column, this.sortDirection);
    this.refreshPagination();
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.refreshPagination();
  }

  onPageSizeChange() {
    this.page = 1;
    this.refreshPagination();
  }

  submitPremiumFeature() {
    this.submitted = true;
    if (this.addPremiumFeaturesForm.invalid) {
      return;
    }

    this.signupSetting.addPremiumFeature(this.addPremiumFeaturesForm.value).subscribe({
      next: res => {
        if (res.success) {
          this.addPremiumFeaturesForm.reset();
          this.submitted = false;
          this.getAllpremiumFeatures();
          this.modalService.close('premiumFeatures_modal');
          this.toastService.success('PremiumFeature added successfully!', {
            position: 'top-end',
          });
        }
      },
      error: (res: any) => {
        this.toastService.error(res.error.message, {
          position: 'top-end',
        });
      }
    });
  }

  removePremiumFeatureId(id: any) {
    this.signupSetting.removePremiumFeatureUsingId(id).subscribe({
      next: (res: any) => {
        if (res.success === true) {
          this.getAllpremiumFeatures();
          this.toastService.success('PremiumFeature removed successfully!', {
            position: 'top-end',
          });
        }
      },
      error: (res: any) => {
        this.toastService.error(res.error.message, {
          position: 'top-end',
        });
      }
    });
  }

  togglePremiumFeatureStatus(id: any, currentStatus: number) {
    const newStatus = currentStatus === 1 ? 0 : 1;
    const updateData = {
      id: id,
      isActive: newStatus
    };
    this.signupSetting.updatePremiumFeaturesUsingId(updateData).subscribe({
      next: (res: any) => {
        this.getAllpremiumFeatures();

        if (newStatus === 1) {
          this.toastService.success('PremiumFeature activated successfully!', {
            position: 'top-end',
          });
        } else {
          this.toastService.error('PremiumFeature deactivated successfully!', {
            position: 'top-end',
          });
        }
      },
      error: (res: any) => {
        this.toastService.error(res.error.message, {
          position: 'top-end',
        });
      }
    });
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.filteredPremiumFeatures = this.searchService.search(this.premiumFeatures, this.searchTerm, ['name', 'icon']);
    this.collectionSize = this.filteredPremiumFeatures.length;
    this.page = 1;
    this.refreshPagination();
  }
  openAddPremiumFeatures() {
    this.isUpdateMode = false;
    this.updatePremiumFeatureId = null;
    this.addPremiumFeaturesForm.reset();
    this.modalService.open('premiumFeatures_modal');
  }

  editPremiumFeature(premiumFeatures: any) {
    this.isUpdateMode = true;
    this.updatePremiumFeatureId = premiumFeatures.id;
    // Implement edit functionality here
    this.addPremiumFeaturesForm.patchValue({
      name: premiumFeatures.name,
      icon: premiumFeatures.icon
    });
    this.modalService.open('premiumFeatures_modal');
  }
  updatePremiumFeatureDetails() {
    this.submitted = true;
    if (this.addPremiumFeaturesForm.invalid) {
      return;
    }
    const updateData = {
      id: this.updatePremiumFeatureId,
      ...this.addPremiumFeaturesForm.value
    };

    this.signupSetting.updatePremiumFeaturesUsingId(updateData).subscribe({
      next: res => {
        if (res.success) {
          this.addPremiumFeaturesForm.reset();
          this.submitted = false;
          this.getAllpremiumFeatures();
          this.modalService.close('premiumFeatures_modal');
          this.toastService.success('PremiumFeature updated successfully!', {
            position: 'top-end',
          });
        }
      },
      error: (res: any) => {
        this.toastService.error(res.error.message, {
          position: 'top-end',
        });
      }
    });
  }
}
