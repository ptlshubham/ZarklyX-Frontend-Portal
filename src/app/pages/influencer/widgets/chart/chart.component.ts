import { Component } from '@angular/core';

declare var ApexCharts: any;

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  
  ngAfterViewInit(): void {
    // Add a small delay to ensure DOM is fully rendered
    setTimeout(() => {
      this.initEarningsChart();
    }, 100);
  }

  private initEarningsChart(): void {
    const data = [75, 25, 45, 15, 85, 35, 70, 25, 35, 15, 45, 30];
    const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const options = {
      series: [{
        name: 'series1',
        data: data
      }],
      chart: {
        height: 250,
        type: 'area',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: ['var(--color-primary)']
      },
      xaxis: {
        categories: categories,
        axisBorder: {
          show: false
        },
        maxTicks: 12,
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: 'var(--color-muted-foreground)',
            fontSize: '12px'
          }
        },
        crosshairs: {
          position: 'front',
          stroke: {
            color: 'var(--color-primary)',
            width: 1,
            dashArray: 3
          }
        },
        tooltip: {
          enabled: false,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: 'var(--color-muted-foreground)',
            fontSize: '12px'
          },
          formatter: function(value: number) {
            return `$${value}K`;
          }
        }
      },
      tooltip: {
        enabled: true,
        custom: function(opts: any) {
          const { series, seriesIndex, dataPointIndex } = opts;
          const number = parseInt(series[seriesIndex][dataPointIndex]) * 1000;
          const monthName = categories[dataPointIndex];
          
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          });
          const formattedNumber = formatter.format(number);
          
          return `
            <div class="flex flex-col gap-2 p-3.5">
              <div class="font-medium text-2sm text-white">${monthName}, 2025 Sales</div>
              <div class="flex items-center gap-1.5">
                <div class="font-semibold text-md text-mono">${formattedNumber}</div>
                <span class="kt-badge kt-badge-outline kt-badge-success kt-badge-xs">+24%</span>
              </div>
            </div>
          `;
        }
      },
      markers: {
        size: 0,
        colors: 'var(--color-primary)',
        strokeColors: 'var(--color-primary)',
        strokeWidth: 4,
        strokeOpacity: 1,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: 'circle',
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        onDblClick: undefined,
        showNullDataPoints: true,
        hover: {
          size: 8,
          sizeOffset: 0
        }
      },
      fill: {
        gradient: {
          enabled: true,
          opacityFrom: 0.25,
          opacityTo: 0
        }
      },
      grid: {
        borderColor: 'var(--color-border)',
        strokeDashArray: 5,
        clipMarkers: false,
        yaxis: {
          lines: {
            show: true
          }
        },
        xaxis: {
          lines: {
            show: false
          }
        }
      }
    };

    const element = document.querySelector('#earnings_chart');
    if (!element) {
      console.error('Chart element #earnings_chart not found');
      return;
    }

    const chart = new ApexCharts(element, options);
    chart.render();
  }
}
