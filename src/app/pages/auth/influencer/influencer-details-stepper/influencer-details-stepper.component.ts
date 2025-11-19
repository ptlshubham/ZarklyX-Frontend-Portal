import { Component, DOCUMENT, Inject, Renderer2 } from '@angular/core';
import { BaseAuthComponent } from '../../base-auth.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

interface InfluencerCategory {
  value: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-influencer-details-stepper',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './influencer-details-stepper.component.html',
  styleUrls: ['../../auth-layout.scss', './influencer-details-stepper.component.scss']
})
export class InfluencerDetailsStepperComponent extends BaseAuthComponent {
  currentStep = 1;
  isLoading = false;
  submitted = false;

  influencerForm!: FormGroup;

  influencerCategories: InfluencerCategory[] = [
    { value: 'Photographer', label: 'Photographer', icon: 'ki-camera' },
    { value: 'Videographer', label: 'Videographer', icon: 'ki-video' },
    { value: 'FoodCooking', label: 'Food / Cooking', icon: 'ki-cup' },
    { value: 'TravelerBlogger', label: 'Traveler / Travel Blogger', icon: 'ki-map' },
    { value: 'HostAnchor', label: 'Host / Anchor', icon: 'ki-mic' },
    { value: 'FashionInfluencer', label: 'Fashion Influencer', icon: 'ki-star' },
    { value: 'FitnessInfluencer', label: 'Fitness Influencer', icon: 'ki-dumbbell' },
    { value: 'TechnologyReviewer', label: 'Technology Reviewer', icon: 'ki-setting' },
    { value: 'BeautyMakeup', label: 'Beauty / Makeup', icon: 'ki-brush' },
    { value: 'GamingStreamer', label: 'Gaming / Streamer', icon: 'ki-gamepad' },
    { value: 'MusicDance', label: 'Music / Dance', icon: 'ki-music' },
    { value: 'ArtDesign', label: 'Art / Design', icon: 'ki-brush-2' },
    { value: 'Lifestyle', label: 'Lifestyle', icon: 'ki-heart' },
    { value: 'FinanceBusiness', label: 'Finance / Business', icon: 'ki-chart' },
    { value: 'EducationMotivational', label: 'Education / Motivational', icon: 'ki-book-open' },
    { value: 'PetAnimal', label: 'Pet / Animal', icon: 'ki-paw' },
    { value: 'Other', label: 'Other (with text box)', icon: 'ki-category' },
  ];

  socialMediaOptions = [
    { label: 'Instagram', value: 'instagram', icon: '/assets/media/brand-logos/instagram.svg' },
    { label: 'YouTube', value: 'youtube', icon: '/assets/media/brand-logos/youtube.svg' },
    { label: 'Facebook', value: 'facebook', icon: '/assets/media/brand-logos/facebook.svg' },
    { label: 'LinkedIn', value: 'linkedin', icon: '/assets/media/brand-logos/linkedin-2.svg' },
    { label: 'Twitter (X)', value: 'twitter', icon: '/assets/media/brand-logos/x.svg' },
    { label: 'Tik Tok', value: 'tictok', icon: '/assets/media/brand-logos/tiktok.svg' }
  ];


  constructor(
    public router: Router,
    public authService: AuthService,
    private fb: FormBuilder,
    renderer: Renderer2,
    @Inject(DOCUMENT) document: Document) {
    super(renderer, document);

    this.initializeForm();
  }

  private initializeForm(): void {
    this.influencerForm = this.fb.group({
      categories: [[]],
      socialMedia: [[]]
    });
  }

  toggleInfluencerCategory(category: string): void {
    const current = this.influencerForm.get('categories')?.value ?? [];
    const exists = current.includes(category);
    const updated = exists ? current.filter((c: string) => c !== category) : [...current, category];

    this.influencerForm.patchValue({ categories: updated });
  }

  isCategorySelected(category: string): boolean {
    return this.influencerForm.get('categories')?.value.includes(category);
  }

  toggleSocialMedia(platform: string) {
    const arr = [...this.influencerForm.value.socialMedia];
    const exists = arr.includes(platform);
    const updated = exists ? arr.filter(p => p !== platform) : [...arr, platform];

    this.influencerForm.patchValue({ socialMedia: updated });
  }

  isSocialMediaSelected(platform: string): boolean {
    return this.influencerForm.value.socialMedia.includes(platform);
  }

  nextStep(): void {
    if (this.isStepValid() && this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) this.currentStep--;
  }

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.influencerForm.get('categories')?.value.length > 0;
      case 2:
        return !!this.influencerForm.get('accountType')?.value;
      case 3:
        return this.influencerForm.get('profileDetails')?.valid ?? false;
      default:
        return false;
    }
  }

  getStepBgClass(): string {
    return `step-${this.currentStep}`;
  }

  onSubmit() {
    this.submitted = true;
    if (this.influencerForm.invalid) {
      return;
    }
    console.log(this.influencerForm)
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);
    }, 1500);
  }
}
