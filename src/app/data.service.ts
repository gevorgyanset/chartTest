import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Get the date for the previous day
  get lastDay(): Date {
    return moment().subtract(1, 'days').toDate();
  }

  // Data stream for the time period
  public timePeriodSubject = new BehaviorSubject<{ start: Date; end: Date }>({
    start: this.lastDay,  // Start of the time period set to the previous day
    end: new Date()        // End of the time period set to the current date
  });

  constructor() {}

  // Generate random data for the chart
  generateRandomChartData() {
    let {start, end} = this.timePeriodSubject.value;
    const data = [];
    for (let i = 0; i < 30; i++) {
      const randomValue = Math.random() * 100;
      data.push({ x: (this.randomDate(start, end)).getTime(), y: Math.floor(randomValue) });
    }

    // Sort data by time (x-coordinate)
    return data.sort((a, b) => a.x - b.x);
  }

  // Generate a random date between the specified start and end
  private randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
}
