import { Component, inject, input, signal, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { DashboardServiceService, Widgets } from '../dashboard-service.service';


@Component({
  selector: 'app-widgets',
  imports: [NgComponentOutlet],
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
  host: {
    '[style.grid-column]': '"span " + (data().cols ?? 1)',
    '[style.grid-row]': '"span " + (data().rows ?? 1)'
  }
})
export class WidgetsComponent {
  data = input.required<Widgets>();
  showOptions = signal(false);
  dashboard = inject(DashboardServiceService);

  isEditable = this.dashboard.isEditable;

  setWidth(v: number) {
    this.dashboard.updateWidgetSize(this.data().id, undefined, v);
  }

  setHeight(v: number) {
    this.dashboard.updateWidgetSize(this.data().id, v, undefined);
  }

  deleteWidget() {
    this.dashboard.deleteWidget(this.data().id)
  }
}
