import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./agency/main-login/main-login.component').then(c => c.MainLoginComponent),
        data: {
            title: 'Agency Login',
            breadcrumb: 'Login'
        }
    },
    {
        path: 'login/influencer',
        loadComponent: () => import('./influencer/influencer-login/influencer-login.component').then(c => c.InfluencerLoginComponent),
        data: {
            title: 'Influencer Login',
            breadcrumb: 'Influencer Login'
        }
    },
    {
        path: 'basic-details',
        loadComponent: () => import('./agency/agency-basic-details-stepper/agency-basic-details-stepper.component').then(c => c.AgencyBasicDetailsStepperComponent),
        data: {
            title: 'basic-details',
            breadcrumb: 'basic-details'
        }
    },
    {
        path: 'login/super-admin',
        loadComponent: () => import('./super-admin/super-admin-login/super-admin-login.component').then(c => c.SuperAdminLoginComponent),
        data: {
            title: 'Super Admin Login',
            breadcrumb: 'Super Admin Login'
        }
    },
    {
        path: 'signup',
        loadComponent: () => import('./agency/signup/signup.component').then(c => c.SignupComponent),
        data:{
            title: 'Sign Up',
            breadcrumb: 'Sign Up'
        }
    }
    // Add more auth routes here as you create components:
    // {
    //   path: 'register',
    //   loadComponent: () => import('./agency/register/register.component').then(c => c.RegisterComponent),
    //   data: {
    //     title: 'Agency Registration',
    //     breadcrumb: 'Register'
    //   }
    // },
    // {
    //   path: 'forgot-password',
    //   loadComponent: () => import('./common/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent),
    //   data: {
    //     title: 'Forgot Password',
    //     breadcrumb: 'Forgot Password'
    //   }
    // },
    // {
    //   path: 'reset-password',
    //   loadComponent: () => import('./common/reset-password/reset-password.component').then(c => c.ResetPasswordComponent),
    //   data: {
    //     title: 'Reset Password',
    //     breadcrumb: 'Reset Password'
    //   }
    // }
    // {
    //   path: 'verify-email',
    //   loadComponent: () => import('./common/verify-email/verify-email.component').then(c => c.VerifyEmailComponent),
    //   data: {
    //     title: 'Verify Email',
    //     breadcrumb: 'Verify Email'
    //   }
    // }
];