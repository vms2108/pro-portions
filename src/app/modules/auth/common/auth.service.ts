import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

import { AuthApiErrors } from './auth.api-errors';
import { RolesEnum } from './enums/roles.enum';
import { UserJson } from './json/user.json-interface';
import { UserModelsFactory } from './models/user-models.factory';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {

  public readonly canCheckAccess = new Subject<void>();

  public readonly roles = new BehaviorSubject<Set<RolesEnum>>(new Set<RolesEnum>());

  public currentUser!: BehaviorSubject<boolean>;

  private readonly currentUserKey = 'currentUser';

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private userModelsFactory: UserModelsFactory,
    private localStorageService: LocalStorageService,
    authApiErrors: AuthApiErrors,
  ) {
    this.initialCurrentUser();
    authApiErrors.registerErrors();
  }

  public get isLoggedIn(): boolean {
    return this.localStorageService.get(this.currentUserKey);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public login(login: string, password: string, newPassword: string | null = null): void {
  }

  public logout(): void {
    this.localStorageService.remove(this.currentUserKey);
    this.router.navigate(['/login']);
  }

  public getUserInfo(): UserJson {
    return JSON.parse(this.localStorageService.get(this.currentUserKey));
  }

  private ttlRefresh(): void {
  }

  private initialCurrentUser(): void {
    this.currentUser = new BehaviorSubject<boolean>(this.localStorageService.get(this.currentUserKey));
    if (this.isLoggedIn) {
      const user: UserJson = JSON.parse(this.localStorageService.get(this.currentUserKey));
      this.roles.next(this.userModelsFactory.createSetFromArray(user.roles));
      this.ttlRefresh();
    }
  }
}
