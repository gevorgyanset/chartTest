import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ChartFormInterface } from 'src/models/chart.model';
import { ChartDialogComponent } from 'src/app/chart-dialog/chart-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  @Output() createChartEvent = new EventEmitter<ChartFormInterface[]>();
  @Input() chartCount: number = 0;
  constructor(
    public dialog: MatDialog
  ) {}

  async openDialog() {
    const dialogRef = this.dialog.open(ChartDialogComponent, {
      width: '600px',
      data: [],
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.createChartEvent.emit(result);
        }
    });
  }
}
