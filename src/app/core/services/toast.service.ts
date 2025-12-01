import { Injectable } from '@angular/core';

declare global {
  interface Window {
    KTToast: any;
  }
}

export interface ToastOptions {
  message: string;
  variant?: 'primary' | 'success' | 'warning' | 'destructive' | 'info' | 'mono' | 'secondary';
  position?: 'top-end' | 'top-center' | 'top-start' | 'bottom-end' | 'bottom-center' | 'bottom-start';
  icon?: string;
  beep?: boolean;
  progress?: boolean;
  pauseOnHover?: boolean;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  private show(options: ToastOptions) {
    if (typeof window !== 'undefined' && window.KTToast) {
      const toastConfig: any = {
        message: options.message,
        variant: options.variant || 'primary',
        position: options.position || 'top-end',
        progress: options.progress !== undefined ? options.progress : true,
        pauseOnHover: options.pauseOnHover !== undefined ? options.pauseOnHover : true,
      };

      if (options.icon) {
        toastConfig.icon = options.icon;
      }

      if (options.beep !== undefined) {
        toastConfig.beep = options.beep;
      }

      if (options.duration) {
        toastConfig.duration = options.duration;
      }

      window.KTToast.show(toastConfig);
    }
  }

  private getDefaultIcon(variant: string): string {
    switch (variant) {
      case 'success':
        return '<i class="ki-filled ki-check text-success"></i>';
      case 'destructive':
        return '<i class="ki-filled ki-cross-circle text-danger"></i>';
      case 'warning':
        return '<i class="ki-filled ki-information-2 text-warning"></i>';
      case 'info':
        return '<i class="ki-filled ki-information text-info"></i>';
      case 'primary':
        return '<i class="ki-filled ki-information text-primary"></i>';
      case 'secondary':
        return '<i class="ki-filled ki-information text-secondary"></i>';
      case 'mono':
        return '<i class="ki-filled ki-information text-gray-700"></i>';
      default:
        return '<i class="ki-filled ki-information"></i>';
    }
  }

  // Simple method with all options
  showToast(options: ToastOptions) {
    this.show(options);
  }

  // Convenience methods
  success(message: string, options?: Partial<ToastOptions>) {
    this.show({
      message,
      variant: 'success',
      icon: this.getDefaultIcon('success'),
      ...options
    });
  }

  error(message: string, options?: Partial<ToastOptions>) {
    this.show({
      message,
      variant: 'destructive',
      icon: this.getDefaultIcon('destructive'),
      ...options
    });
  }

  warning(message: string, options?: Partial<ToastOptions>) {
    this.show({
      message,
      variant: 'warning',
      icon: this.getDefaultIcon('warning'),
      ...options
    });
  }

  info(message: string, options?: Partial<ToastOptions>) {
    this.show({
      message,
      variant: 'info',
      icon: this.getDefaultIcon('info'),
      ...options
    });
  }

  primary(message: string, options?: Partial<ToastOptions>) {
    this.show({
      message,
      variant: 'primary',
      icon: this.getDefaultIcon('primary'),
      ...options
    });
  }

  secondary(message: string, options?: Partial<ToastOptions>) {
    this.show({
      message,
      variant: 'secondary',
      icon: this.getDefaultIcon('secondary'),
      ...options
    });
  }

  mono(message: string, options?: Partial<ToastOptions>) {
    this.show({
      message,
      variant: 'mono',
      icon: this.getDefaultIcon('mono'),
      ...options
    });
  }
}
