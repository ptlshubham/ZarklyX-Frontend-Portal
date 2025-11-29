import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Country, ICountry } from 'country-state-city';

declare const KTSelect: any;

@Component({
  selector: 'app-add-agency-employee',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-agency-employee.component.html',
  styleUrl: './add-agency-employee.component.scss'
})
export class AddAgencyEmployeeComponent implements AfterViewInit {
  @ViewChild('genderSelect') genderSelect!: ElementRef;
  @ViewChild('maritalStatusSelect') maritalStatusSelect!: ElementRef;
  @ViewChild('departmentSelect') departmentSelect!: ElementRef;
  @ViewChild('employmentTypeSelect') employmentTypeSelect!: ElementRef;
  @ViewChild('employeeStatusSelect') employeeStatusSelect!: ElementRef;
  @ViewChild('nationalitySelect') nationalitySelect!: ElementRef;
  @ViewChild('bloodgroupSelect') bloodgroupSelect!: ElementRef;
  @ViewChild('paymentModeSelect') paymentModeSelect!: ElementRef;
  @ViewChild('worksheetSelect') worksheetSelect!: ElementRef;
  @ViewChild('attendanceTypeSelect') attendanceTypeSelect!: ElementRef;
  @ViewChild('emailPasswordDelevierdSelect') emailPasswordDelevierdSelect!: ElementRef;




  selectedGenderSelect: any;
  selectedMaritalStatusSelect: any;
  selectedDepartmentSelect: any;
  selectedNationalitySelect: any;
  selectedbloodgroupSelect: any;
  selectedEmploymentTypeSelect: any;
  selectedEmployeeStatusSelect: any;
  selectedPaymentModeSelect: any;
  selectedWorksheetSelect: any;
  selectedAttendanceTypeSelect: any;
  selectedEmailPasswordDelevierdSelect: any;

  form!: FormGroup;
  countries: ICountry[] = [];
  submitted = false;

  genders = ['Male', 'Female', 'Other'];
  maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Intern', 'Consultant'];
  employeeStatuses = ['Active', 'Terminated', 'On Leave', 'Resigned'];
  departments = ['HR', 'Engineering', 'Sales', 'Marketing', 'Finance', 'Operations', 'Other'];

  constructor(private fb: FormBuilder) {
    this.initializeForm();
    this.initializeCountries();
  }

  ktConfig = JSON.stringify({
    displayTemplate: `<div class="flex items-center gap-2"><span class="text-foreground">{{text}}</span></div>`,
    optionTemplate: `<div class="flex items-center gap-2"><span class="text-foreground">{{text}} {{name}}</span></div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5 ms-auto hidden text-primary kt-select-option-selected:block"><path d="M20 6 9 17l-5-5"/></svg>`,
    optionsClass: "kt-scrollable overflow-auto max-h-[250px]"
  });

  ngAfterViewInit(): void {
    this.initializeSelects();
  }

  private initializeForm() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      bloodGroup: [''],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      emergencyContactName: ['', Validators.required],
      emergencyContactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      emergencyContactRelationship: [''],
      permanentAddress: ['', Validators.required],
      currentAddress: [''],

      employeeId: ['', Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      employmentType: ['', Validators.required],
      workLocation: [''],
      reportingManager: [''],
      employeeStatus: ['', Validators.required],

      aadharNumber: ['', Validators.pattern(/^[0-9]{12}$/)],
      panNumber: ['', Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/)],
      passportNumber: [''],
      drivingLicenseNumber: [''],
      voterId: [''],

      accountHolderName: [''],
      bankName: [''],
      branchName: [''],
      accountNumber: [''],
      ifscCode: ['', Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)],
      salaryCTC: [''],
      salaryBasic: [''],
      salaryHRA: [''],
      allowances: [''],
      pfNumber: [''],
      esicNumber: [''],
      uanNumber: [''],
      paymentMode: ['Bank Transfer'],

      previousCompany: [''],
      totalExperience: [''],
      lastCTC: [''],
      skills: [''],

      probationPeriod: [''],
      confirmationDate: [''],
      workShift: ['General'],
      attendanceType: ['Biometric'],
      leavePolicyAssigned: [''],
      ndaSigned: [false],

      officialEmail: [''],
      emailPasswordDelivered: [false],
      systemAssigned: [''],
      assetId: [''],
      crmAccess: [false],
      hrmsAccess: [false],
      driveAccess: [false],
      adminToolsAccess: [false],
      accessCardIssued: [false]
    });
  }

  private initializeCountries() {
    this.countries = Country.getAllCountries().sort((a, b) => a.name.localeCompare(b.name));
  }

  public initializeSelects(): void {
    setTimeout(() => {
      if (typeof KTSelect !== 'undefined') {
        if (this.genderSelect?.nativeElement && !this.selectedGenderSelect) {
          this.selectedGenderSelect = new KTSelect(this.genderSelect.nativeElement);
        }
        if (this.maritalStatusSelect?.nativeElement && !this.selectedMaritalStatusSelect) {
          this.selectedMaritalStatusSelect = new KTSelect(this.maritalStatusSelect.nativeElement);
        }
        if (this.departmentSelect?.nativeElement && !this.selectedDepartmentSelect) {
          this.selectedDepartmentSelect = new KTSelect(this.departmentSelect.nativeElement);
        }
        if (this.employmentTypeSelect?.nativeElement && !this.selectedEmploymentTypeSelect) {
          this.selectedEmploymentTypeSelect = new KTSelect(this.employmentTypeSelect.nativeElement);
        }
        if (this.employeeStatusSelect?.nativeElement && !this.selectedEmployeeStatusSelect) {
          this.selectedEmployeeStatusSelect = new KTSelect(this.employeeStatusSelect.nativeElement);
        }
        if (this.nationalitySelect?.nativeElement && !this.selectedNationalitySelect) {
          this.selectedNationalitySelect = new KTSelect(this.nationalitySelect.nativeElement);
        }
        if (this.bloodgroupSelect?.nativeElement && !this.selectedbloodgroupSelect) {
          this.selectedbloodgroupSelect = new KTSelect(this.bloodgroupSelect.nativeElement);
        }
        if (this.paymentModeSelect?.nativeElement && !this.selectedPaymentModeSelect) {
          this.selectedPaymentModeSelect = new KTSelect(this.paymentModeSelect.nativeElement);
        }
        if (this.worksheetSelect?.nativeElement && !this.selectedWorksheetSelect) {
          this.selectedWorksheetSelect = new KTSelect(this.worksheetSelect.nativeElement);
        }
        if (this.attendanceTypeSelect?.nativeElement && !this.selectedAttendanceTypeSelect) {
          this.selectedAttendanceTypeSelect = new KTSelect(this.attendanceTypeSelect.nativeElement);
        }
        if (this.emailPasswordDelevierdSelect?.nativeElement && !this.selectedEmailPasswordDelevierdSelect) {
          this.selectedEmailPasswordDelevierdSelect = new KTSelect(this.emailPasswordDelevierdSelect.nativeElement);
        }


      }
    }, 100);
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => this.form.controls[key].markAsTouched());
      return;
    }
    console.log('Add Employee Form:', this.form.value);
  }
}
