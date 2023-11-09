// authentication.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { Login, PossibleRoles, User } from '../models/user.model';

const IS_AUTHENTICATED_KEY = 'isAuthenticated';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private isCreationPermissionSubject = new BehaviorSubject<boolean>(false);
  isCreationPermission: Observable<boolean> = this.isCreationPermissionSubject.asObservable();

  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  private get _savedUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  constructor() {
    // Initialize the service with data from the saved user
    this.emitData(this._savedUser);
  }

  /**
   * Logs in the user based on provided authentication data.
   * @param loginData Authentication data (e.g., username and password).
   * @returns Observable<boolean> Observable that emits true if login is successful.
   */
  login(loginData: Login): Observable<boolean> {
    return this.generateUserData(loginData).pipe(
      delay(1000), // Simulates a delay in the request (1 second)
      switchMap((user: User) => {
        const isAuthenticated = true;
        localStorage.setItem(IS_AUTHENTICATED_KEY, JSON.stringify(isAuthenticated));
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this.emitData(user);

        return of(isAuthenticated);
      })
    );
  }

  /**
   * Logs out the user, clears data, and transitions to an unauthenticated state.
   */
  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.isCreationPermissionSubject.next(false);
    this.userSubject.next(null);
    localStorage.removeItem(IS_AUTHENTICATED_KEY);
    localStorage.removeItem(USER_KEY);
  }

  /**
   * Internal method to update user data and emit it through corresponding Subjects.
   * @param userData User data.
   */
  private emitData(userData: User) {
    if (userData) {
      this.isAuthenticatedSubject.next(true);
      this.isCreationPermissionSubject.next(userData.roles?.includes('chartCreator') ?? false);
      this.userSubject.next(userData);
    } else {
      this.logout();
    }
  }

  /**
   * Generates user data based on provided authentication data.
   * @param authData Authentication data (e.g., username and password).
   * @returns Observable<User> Observable that emits user data after generation.
   */
  private generateUserData(authData: Login): Observable<User> {
    // Generate a random user role from available roles
    const role = PossibleRoles[Math.floor(Math.random() * PossibleRoles.length)];

    // Create an object with user data
    const userData: User = {
      sub: authData.userName,
      name: 'John Doe',
      roles: [role],
      exp: (new Date()).getTime()
    };

    // Return an Observable emitting user data
    return of(userData);
  }
}
