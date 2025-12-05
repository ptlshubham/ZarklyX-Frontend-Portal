import { Component, ElementRef, inject, Type, viewChild } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from '../../widgets/widgets/widgets.component';
import { DashboardServiceService } from '../../widgets/dashboard-service.service';

@Component({
  selector: 'app-index',
  imports: [CommonModule, DragDropModule, WidgetsComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  editMode:boolean = false;
  toggleEditMode() {
    this.editMode = !this.editMode;
    this.widgetsService.isEditable.update(() => this.editMode);
  }

  widgetsService = inject(DashboardServiceService);
  widgetsContainer = viewChild.required<ElementRef>('widgetsContainer');

  ngOnInit() {
  }


  dropDashboard(event: CdkDragDrop<any[]>) {
    const dashboard = [...this.widgetsService.addedWidgets()];

    if (event.previousContainer === event.container) {
      moveItemInArray(dashboard, event.previousIndex, event.currentIndex);
      this.widgetsService.addedWidgets.set(dashboard);
    }
  }

}
