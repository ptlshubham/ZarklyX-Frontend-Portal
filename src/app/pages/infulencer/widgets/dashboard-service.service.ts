import { computed, effect, Injectable, signal, Type } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { Chart2Component } from './chart2/chart2.component';
import { Chart3Component } from './chart3/chart3.component';
import { LinkedInWidgetComponent } from './linked-in-widget/linked-in-widget.component';
import { InstagramWidgetComponent } from './instagram-widget/instagram-widget.component';
import { TikTokWidgetComponent } from './tik-tok-widget/tik-tok-widget.component';
import { YoutubeWidgetComponent } from './youtube-widget/youtube-widget.component';

export interface Widgets {
  id: number,
  label: string,
  content: Type<unknown>,
  rows?: number,
  cols?: number
}

@Injectable({
  providedIn: 'root'
})

export class DashboardServiceService {

  data = signal<Widgets[]>([
    {
      id: 1,
      label: "Linked In",
      content: LinkedInWidgetComponent,
      rows: 1,
      cols: 1
    },
    {
      id: 2,
      label: "Instagram",
      content: InstagramWidgetComponent,
      rows: 1,
      cols: 1
    },
    {
      id: 3,
      label: "Tik-Tok",
      content: TikTokWidgetComponent,
      rows: 1,
      cols: 1
    },
    {
      id: 4,
      label: "You Tube",
      content: YoutubeWidgetComponent,
      rows: 1,
      cols: 1
    },
    {
      id: 5,
      label: "Team Meeting",
      content: Chart2Component,
      rows: 2,
      cols: 4
    },
    {
      id: 6,
      label: "Highlight",
      content: ChartComponent,
      rows: 2,
      cols: 2
    },
    {
      id: 7,
      label: "Earnings",
      content: Chart3Component,
      rows: 2,
      cols: 4
    },
  ]);

  isEditable = signal<boolean>(false);
  isHeaderToggleOpen = signal<boolean>(false);

  addedWidgets = signal<Widgets[]>([]);

  widgetsToAdd = computed(() => {
    const addedId = this.addedWidgets().map(w => w.id);
    return this.data().filter(w => !addedId.includes(w.id))
  })

  addWidget(w: Widgets) {
    this.addedWidgets.set([...this.addedWidgets(), w]);
  }

  updateWidgetSize(id: number, rows?: number, cols?: number) {
    this.addedWidgets.update(list =>
      list.map(w =>
        w.id === id
          ? {
            ...w,
            rows: rows !== undefined ? rows : w.rows ?? 1,
            cols: cols !== undefined ? cols : w.cols ?? 1,
          }
          : w
      )
    );
  }

  constructor() {
    this.fetchWidgets();
  }
  fetchWidgets() {
    const widgetsAsString = localStorage.getItem('dashboard_widgets')
    if (widgetsAsString) {
      const widgets = JSON.parse(widgetsAsString) as Widgets[];
      widgets.forEach(widget => {
        const content = this.data().find(w => w.id === widget.id)?.content
        if (content) {
          widget.content = content;
        }
      })
      this.addedWidgets.set(widgets)
    }
  }

  deleteWidget(id: number) {
    this.addedWidgets.update(list => list.filter(w => w.id !== id));
  }

  saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widgets>[] = this.addedWidgets().map(w => ({ ...w }))
    widgetsWithoutContent.forEach(w => {
      delete w.content;
    });
    localStorage.setItem('dashboard_widgets', JSON.stringify(widgetsWithoutContent))
  })
}
