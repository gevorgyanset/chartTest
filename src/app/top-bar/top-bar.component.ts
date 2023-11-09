import { Component, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ChartFormInterface } from 'src/models/chart.model';
import { ChartDialogComponent } from 'src/app/chart-dialog/chart-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnDestroy {
  @Output() createChartEvent = new EventEmitter<ChartFormInterface[]>();
  @Input() chartCount: number = 0;

  public isViewerDisabled: boolean = false;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  readonly viewerTooltip: string = 'You do not have permission to create charts.';
  constructor(
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.isCreationPermission.pipe(takeUntil(this.destroyed$))
    .subscribe((isCreationPermission) => {
      this.isViewerDisabled = !isCreationPermission;
    });
  }

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
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
