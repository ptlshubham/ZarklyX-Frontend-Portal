import { Injectable } from '@angular/core';

declare global {
  interface Window {
    KTModal: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  /**
   * Close a modal by its ID
   * @param modalId The ID of the modal element
   */
  close(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal && window.KTModal) {
      const modalInstance = window.KTModal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  }

  /**
   * Open a modal by its ID
   * @param modalId The ID of the modal element
   */
  open(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal && window.KTModal) {
      const modalInstance = window.KTModal.getInstance(modal);
      if (modalInstance) {
        modalInstance.show();
      }
    }
  }

  /**
   * Toggle a modal by its ID
   * @param modalId The ID of the modal element
   */
  toggle(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal && window.KTModal) {
      const modalInstance = window.KTModal.getInstance(modal);
      if (modalInstance) {
        if (modalInstance.isOpen()) {
          modalInstance.hide();
        } else {
          modalInstance.show();
        }
      }
    }
  }
}
