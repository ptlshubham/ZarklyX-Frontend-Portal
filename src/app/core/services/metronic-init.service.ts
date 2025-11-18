import { Injectable } from '@angular/core';

// Declare all KTui components
declare var KTToggle: any;
declare var KTDrawer: any;
declare var KTMenu: any;
declare var KTScrollable: any;
declare var KTSticky: any;
declare var KTReparent: any;
declare var KTDropdown: any;
declare var KTModal: any;
declare var KTCollapse: any;
declare var KTDismiss: any;
declare var KTTabs: any;
declare var KTAccordion: any;
declare var KTScrollspy: any;
declare var KTScrollto: any;
declare var KTTooltip: any;
declare var KTStepper: any;
declare var KTThemeSwitch: any;
declare var KTImageInput: any;
declare var KTTogglePassword: any;
declare var KTDataTable: any;
declare var KTDatepicker: any;
declare var KTSelect: any;
declare var KTToast: any;

// Declare window object
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class MetronicInitService {

  constructor() { }

  init() {
    // Initialize all available components with safe error handling
    this.safeInit('KTToggle', () => this.initToggles());
    this.safeInit('KTScrollable', () => this.initScrollables());
    this.safeInit('KTDrawer', () => this.initDrawers());
    this.safeInit('KTMenu', () => this.initMenus());
    this.safeInit('KTSticky', () => this.initSticky());
    this.safeInit('KTReparent', () => this.initReparent());
    this.safeInit('KTDropdown', () => this.initDropdowns());
    this.safeInit('KTModal', () => this.initModals());
    this.safeInit('KTCollapse', () => this.initCollapse());
    this.safeInit('KTDismiss', () => this.initDismiss());
    this.safeInit('KTTabs', () => this.initTabs());
    this.safeInit('KTAccordion', () => this.initAccordions());
    this.safeInit('KTScrollspy', () => this.initScrollspy());
    this.safeInit('KTScrollto', () => this.initScrollto());
    this.safeInit('KTTooltip', () => this.initTooltips());
    this.safeInit('KTStepper', () => this.initSteppers());
    this.safeInit('KTThemeSwitch', () => this.initThemeSwitch());
    this.safeInit('KTImageInput', () => this.initImageInput());
    this.safeInit('KTTogglePassword', () => this.initTogglePassword());
    this.safeInit('KTDataTable', () => this.initDatatables());
    this.safeInit('KTDatepicker', () => this.initDatepicker());
    this.safeInit('KTSelect', () => this.initSelect());
    this.safeInit('KTToast', () => this.initToast());
  }

  private safeInit(componentName: string, initFn: () => void) {
    try {
      if (typeof window !== 'undefined' && window[componentName] && typeof window[componentName].init === 'function') {
        initFn();
      } else {
        console.warn(`${componentName} component is not available or does not have an init method`);
      }
    } catch (error) {
      console.error(`Error initializing ${componentName}:`, error);
    }
  }

  initDrawers() {
    if (typeof KTDrawer !== 'undefined') {
      KTDrawer.init();
    }
  }

  initMenus() {
    if (typeof KTMenu !== 'undefined') {
      KTMenu.init();
    }
  }

  initDropdowns() {
    if (typeof KTDropdown !== 'undefined') {
      KTDropdown.init();
    }
  }

  initSticky() {
    if (typeof KTSticky !== 'undefined') {
      KTSticky.init();
    }
  }

  initReparent() {
    if (typeof KTReparent !== 'undefined') {
      KTReparent.init();
    }
  }

  initScrollables() {
    if (typeof KTScrollable !== 'undefined') {
      KTScrollable.init();
    }
  }

  initToggles() {
    if (typeof KTToggle !== 'undefined') {
      KTToggle.init();
    }
  }

  initModals() {
    if (typeof KTModal !== 'undefined') {
      KTModal.init();
    }
  }

  initCollapse() {
    if (typeof KTCollapse !== 'undefined') {
      KTCollapse.init();
    }
  }

  initDismiss() {
    if (typeof KTDismiss !== 'undefined') {
      KTDismiss.init();
    }
  }

  initTabs() {
    if (typeof KTTabs !== 'undefined') {
      KTTabs.init();
    }
  }

  initAccordions() {
    if (typeof KTAccordion !== 'undefined') {
      KTAccordion.init();
    }
  }

  initScrollspy() {
    if (typeof KTScrollspy !== 'undefined') {
      KTScrollspy.init();
    }
  }

  initScrollto() {
    if (typeof KTScrollto !== 'undefined') {
      KTScrollto.init();
    }
  }

  initTooltips() {
    if (typeof KTTooltip !== 'undefined') {
      KTTooltip.init();
    }
  }

  initSteppers() {
    if (typeof KTStepper !== 'undefined') {
      KTStepper.init();
    }
  }

  initThemeSwitch() {
    if (typeof KTThemeSwitch !== 'undefined') {
      KTThemeSwitch.init();
    }
  }

  initImageInput() {
    if (typeof KTImageInput !== 'undefined') {
      KTImageInput.init();
    }
  }

  initTogglePassword() {
    if (typeof KTTogglePassword !== 'undefined') {
      KTTogglePassword.init();
    }
  }

  initDatatables() {
    if (typeof KTDataTable !== 'undefined') {
      KTDataTable.init();
    }
  }

  initDatepicker() {
    if (typeof KTDatepicker !== 'undefined') {
      KTDatepicker.init();
    }
  }

  initSelect() {
    if (typeof KTSelect !== 'undefined') {
      KTSelect.init();
    }
  }

  initToast() {
    if (typeof KTToast !== 'undefined') {
      KTToast.init();
    }
  }
}