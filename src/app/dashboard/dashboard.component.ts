import { Component } from '@angular/core';
import { ChartFormInterface, listChart } from 'src/models/chart.model';
import { ChartDialogComponent } from 'src/app/chart-dialog/chart-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  title = 'chart-dashboard';
  charts: listChart[] = [];
  canMergeSelectedCharts: boolean = false;

  constructor(
    public dialog: MatDialog,
  ) {}

  addChart(chartData: ChartFormInterface[]) {
    this.charts.push({
      charts: chartData,
      selected: false
    });
  }

  editLine(chartData: ChartFormInterface[], index: number) {
    const dialogRef = this.dialog.open(ChartDialogComponent, {
      data: chartData,
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.charts[index] = {
          charts: result,
          selected: false
        };
      }
    });
  }
  remove(index: number) {
     this.charts.splice(index, 1);
  }

  onCheckboxChange() {
    this.canMergeSelectedCharts = this.charts.filter(chart => chart.selected).length >= 2;
  }

  mergeSelectedCharts() {
    const charts = this.charts.filter(chart => !chart.selected);
    const selectedCharts: ChartFormInterface[] = this.charts.filter((chart) => chart.selected)
      .map((chart) =>  {
        return [...chart.charts]
    }).reduce((acc, current) => {
      return acc.concat(current);
    }, []);
    this.charts = [
      {
        selected: false,
        charts: selectedCharts
      },
      ...charts
    ]
  }
}
