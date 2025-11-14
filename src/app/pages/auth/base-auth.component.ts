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
    // Add body class for auth mode
    this.renderer.addClass(this.document.body, 'auth-mode');
  }

  ngOnDestroy(): void {
    // Cleanup when leaving auth pages
    this.renderer.removeClass(this.document.body, 'auth-mode');
  }
}