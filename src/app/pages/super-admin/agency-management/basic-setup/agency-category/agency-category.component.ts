import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../../core/services/toast.service';
import { ModalService } from '../../../../../core/services/modal.service';
import { SearchService } from '../../../../../core/services/search.service';
import { SignupSetting } from '../../../../../core/services/super-admin/signup-setting.service';

@Component({
  selector: 'app-agency-category',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agency-category.component.html',
  styleUrl: './agency-category.component.scss'
})
export class AgencyCategoryComponent implements OnInit {
  categories: any[] = [];
  filteredCategories: any[] = [];
  paginateData: any[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm: string = '';

  addCategoryForm!: FormGroup;
  submitted = false;
  isUpdateMode = false;
  updateCategoryId: any = null;
  constructor(
    private signupSetting: SignupSetting,
    private fb: FormBuilder,
    private toastService: ToastService,
    private modalService: ModalService,
    private searchService: SearchService
  ) {
    this.addCategoryForm = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    });
  }

  get f() { return this.addCategoryForm.controls; }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.signupSetting.getAllCategory().subscribe({
      next: res => {
        this.categories = (res.data || []).map((category: any, index: number) => ({
          ...category,
          index: index + 1
        }));
        this.filteredCategories = [...this.categories];
        this.collectionSize = this.filteredCategories.length;
        this.refreshPagination();
      },
      error: err => console.error(err)
    });
  }

  refreshPagination() {
    this.paginateData = this.searchService.paginate(this.filteredCategories, this.page, this.pageSize);
  }

  sortData(column: string) {
    this.sortDirection = this.searchService.toggleSortDirection(this.sortColumn, column, this.sortDirection);
    this.sortColumn = column;
    this.filteredCategories = this.searchService.sort(this.filteredCategories, column, this.sortDirection);
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

  submitCategory() {
    this.submitted = true;
    if (this.addCategoryForm.invalid) {
      return;
    }

    this.signupSetting.addCategory(this.addCategoryForm.value).subscribe({
      next: res => {
        if (res.success) {
          this.addCategoryForm.reset();
          this.submitted = false;
          this.getAllCategories();
          this.modalService.close('category_modal');
          this.toastService.success('Category added successfully!', {
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

  removeCategoryId(id: any) {
    this.signupSetting.removeCategoryUsingId(id).subscribe({
      next: (res: any) => {
        if (res.success === true) {
          this.getAllCategories();
          this.toastService.success('Category removed successfully!', {
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

  toggleCategoryStatus(id: any, currentStatus: number) {
    const newStatus = currentStatus === 1 ? 0 : 1;
    const updateData = {
      id: id,
      isActive: newStatus
    };
    this.signupSetting.updateCategoty(updateData).subscribe({
      next: (res: any) => {
        this.getAllCategories();

        if (newStatus === 1) {
          this.toastService.success('Category activated successfully!', {
            position: 'top-end',
          });
        } else {
          this.toastService.error('Category deactivated successfully!', {
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
    this.filteredCategories = this.searchService.search(this.categories, this.searchTerm, ['name', 'icon']);
    this.collectionSize = this.filteredCategories.length;
    this.page = 1;
    this.refreshPagination();
  }
  openAddCategoryModal() {
    this.isUpdateMode = false;
    this.updateCategoryId = null;
    this.addCategoryForm.reset();
    this.modalService.open('category_modal');
  }

  editCategory(category: any) {
    this.isUpdateMode = true;
    this.updateCategoryId = category.id;
    // Implement edit functionality here
    this.addCategoryForm.patchValue({
      name: category.name,
      icon: category.icon
    });
    this.modalService.open('category_modal');
  }
  updateCategoryDetails() {
    this.submitted = true;
    if (this.addCategoryForm.invalid) {
      return;
    }
    const updateData = {
      id: this.updateCategoryId,
      ...this.addCategoryForm.value
    };

    this.signupSetting.updateCategoty(updateData).subscribe({
      next: res => {
        if (res.success) {
          this.addCategoryForm.reset();
          this.submitted = false;
          this.getAllCategories();
          this.modalService.close('category_modal');
          this.toastService.success('Category updated successfully!', {
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