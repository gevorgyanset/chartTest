import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChartFormInterface } from 'src/models/chart.model';
import { FormArray, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.scss']
})
export class ChartDialogComponent {

  chartForm = this.fb.group({
    lines: this.fb.array([])
  });
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private dialogRef: MatDialogRef<ChartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChartFormInterface[]
  ) {
      if (!data || !data.length) {
        this.addLine();
        return;
      }
      data.forEach((value => {
        this.addLine(value);
      }))
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.chartForm.value.lines);
  }
  addLine(newLine : ChartFormInterface | null = null) {
    const line = this.fb.group({
      type: [newLine?.type ?? 'line'],
      name: [newLine?.name ?? 'temperature'],
      color: [newLine?.color ?? '#000000'],
      data: [newLine?.data ?? this.dataService.generateRandomChartData()]
    });
    this.lines.push(line);
  }
  removeLine(index: number) {
    this.lines.removeAt(index);
  }
  get lines() {
    return this.chartForm.get('lines') as FormArray;
  }
}
