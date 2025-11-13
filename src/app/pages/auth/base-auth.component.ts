import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  template: '',
  styleUrls: ['./auth-layout.scss']
})
export abstract class BaseAuthComponent implements OnInit, OnDestroy {
  
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // Add body class to prevent scrolling and hide any layout elements
    this.renderer.addClass(this.document.body, 'auth-mode');
    this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
    
    // Hide any potential layout elements
    this.hideLayoutElements();
  }

  ngOnDestroy(): void {
    // Cleanup when leaving auth pages
    this.renderer.removeClass(this.document.body, 'auth-mode');
    this.renderer.removeStyle(this.document.body, 'overflow');
    
    // Show layout elements again
    this.showLayoutElements();
  }

  private hideLayoutElements(): void {
    // Hide potential layout elements that might interfere
    const elementsToHide = [
      'header',
      'nav',
      '.sidebar',
      '.kt-sidebar',
      '.kt-header',
      '.kt-footer',
      'footer'
    ];

    elementsToHide.forEach(selector => {
      const elements = this.document.querySelectorAll(selector);
      elements.forEach(element => {
        this.renderer.setStyle(element, 'display', 'none');
        this.renderer.setAttribute(element, 'data-auth-hidden', 'true');
      });
    });
  }

  private showLayoutElements(): void {
    // Show previously hidden elements
    const hiddenElements = this.document.querySelectorAll('[data-auth-hidden]');
    hiddenElements.forEach(element => {
      this.renderer.removeStyle(element, 'display');
      this.renderer.removeAttribute(element, 'data-auth-hidden');
    });
  }
}