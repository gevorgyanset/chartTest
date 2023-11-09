// login.component.ts
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <mat-card class="card-container">
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="login()">
            <mat-form-field>
              <mat-label>Username:</mat-label>
              <input matInput id="username" formControlName="username">
            </mat-form-field>
            <mat-form-field>
              <mat-label>Password:</mat-label>
              <input matInput type="password" id="password" formControlName="password">
            </mat-form-field>
            <mat-card-footer>
                <button mat-raised-button color="primary"  [disabled]="submited" type="submit" >Login</button>
            </mat-card-footer>
          </form>
        </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  submited: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.submited = true;
      this.authService.login(this.loginForm.value).subscribe((status) => {
        if (status) {
           this.router.navigate(['/']);
        }
        this.submited = false;
      });
    }
  }
}
