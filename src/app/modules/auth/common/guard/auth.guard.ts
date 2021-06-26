import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable,  Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { RolesEnum } from '../enums/roles.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  private lastReturnUrl: string | null = null;

  private lastRequiredRole: RolesEnum | null = null;

  private canStaySubscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    const subscription = this.authService
      .roles
      .subscribe(roles => this.checkAccess(this.lastRequiredRole!, roles));
    this.canStaySubscription.add(subscription);
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.lastReturnUrl =  state.url;
    this.lastRequiredRole = route.data.role;
    return this.authService
      .roles
      .pipe(
        first(),
        map(roles => this.checkAccess(this.lastRequiredRole!, roles)),
      );
  }

  private checkAccess(role: RolesEnum, roles: Set<RolesEnum>): boolean {

    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.lastReturnUrl } });
      return false;
    }

    if (!role) {
      return true;
    }

    if (roles.size && roles.has(role)) {
      return true;
    }

    this.router.navigate(['/access-denied'], { queryParams: { returnUrl: this.lastReturnUrl } });
    return false;
  }
}
