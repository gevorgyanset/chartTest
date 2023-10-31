import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './app-date-range-picker.component.html',
  styleUrls: ['./app-date-range-picker.component.scss']
})
export class AppDateRangePickerComponent {

  constructor(private dataService: DataService) {}

  range = new FormGroup({
    start: new FormControl<Date>(this.dataService.lastDay, Validators.required),
    end: new FormControl<Date>(new Date(), Validators.required),
  });

  selectDateRange() {
    if (this.range.valid) {
        this.dataService.timePeriodSubject.next({
          start: this.range.controls.start.value as Date,
          end: this.range.controls.end.value as Date
        });
    }
  }
}
