import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgencyManagementService } from '../../../../../core/services/super-admin/agency-management.service';

@Component({
  selector: 'app-agency-category',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agency-category.component.html',
  styleUrl: './agency-category.component.scss'
})
export class AgencyCategoryComponent implements OnInit {
  categories: any[] = [];
  paginateData: any[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0;

  addCategoryForm!: FormGroup;
  submitted = false;

  constructor(
    private agencyManagementService: AgencyManagementService,
    private fb: FormBuilder
  ) {
    this.addCategoryForm = this.fb.group({
      name: ['', Validators.required],
      icon: ['']
    });
  }

  get f() { return this.addCategoryForm.controls; }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.agencyManagementService.getAllCategory().subscribe({
      next: res => {
        this.categories = res.data;
        this.collectionSize = this.categories.length;
        this.paginateData = this.categories.slice(0, this.pageSize);
        console.log('Categories:', this.paginateData);
      },
      error: err => console.error(err)
    });
  }

  addCategory() {
    this.submitted = true;
    console.log('click')

    if (this.addCategoryForm.invalid) {
      return;
    }

    this.agencyManagementService.addCategory(this.addCategoryForm.value).subscribe({
      next: res => {
        console.log('Category added:', res);
        this.addCategoryForm.reset();
        this.submitted = false;
        this.getAllCategories(); // refresh table
      },
      error: err => console.error(err)
    });
  }
  removeCategoryId(id: any) {
    debugger
    this.agencyManagementService.removeCategoryUsingId(id).subscribe({
      next: res => {
        console.log('Category added:', res);
        this.addCategoryForm.reset();
        this.submitted = false;
        this.getAllCategories(); // refresh table
      },
      error: err => console.error(err)
    });
  }
}
