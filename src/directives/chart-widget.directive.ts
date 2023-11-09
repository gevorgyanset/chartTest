import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartFormInterface } from 'src/models/chart.model';
import { DataService } from 'src/services/data.service';

@Directive({
  selector: '[appChartWidget]',
})
export class ChartWidgetDirective implements OnInit {

  @Input() chartItem?: ChartFormInterface[] = [];

  constructor(
    private el: ElementRef,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // Subscribe to changes in the time period and update the chart when it changes
    this.dataService.timePeriodSubject.subscribe(() => {
      this.updateChart();
    });
  }

  private updateChart() {
    if (this.chartItem && this.chartItem.length) {
      // Combine the names of the chart items
      const name = this.chartItem.map(item => item.name).join(', ');
      const chartOptions: Highcharts.Options = {
        plotOptions: {
          spline: {
            pointInterval: 3600000,  // Set the point interval to one hour
          },
        },
        title: {
          text: `Chart For ${name}`,
        },
        xAxis: {
          type: 'datetime',
          // Set the min and max values for the x-axis based on the selected time period
          min: (this.dataService.timePeriodSubject.value.start).getTime(),
          max: (this.dataService.timePeriodSubject.value.end).getTime(),
        },
        yAxis: {
          title: {
            text: name,
          },
          min: 0,   // Set the minimum value for the y-axis
          max: 100, // Set the maximum value for the y-axis
        },
        tooltip: {
          valueSuffix: name,
        },
        series: this.chartItem,  // Data series for the chart
      };
      // Create or update the Highcharts chart
      Highcharts.chart(this.el.nativeElement, chartOptions);
    }
  }
}
