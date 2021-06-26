import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TitleService } from 'src/app/root-components/header/common/title.service';
import { environment } from 'src/environments/environment';

import { AuthService } from './../../modules/auth/common/auth.service';
import { NavigationService } from './../navigation/common/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {

  public env = environment.env;

  public title = this.titleService.getTitle();

  public isLoggedIn!: boolean;

  private subscriptions = new Subscription();

  constructor(
    public authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private titleService: TitleService,
    private navigationService: NavigationService,
  ) {
  }

  public ngOnInit(): void {
    this.initialLoginCheck();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public logout(): void {
    this.authService.logout();
  }

  public toggleNavigation(): void {
    this.navigationService.toogleNavigation();
  }

  private initialLoginCheck(): void {
    const subscription = this.authService
      .currentUser
      .subscribe(data => {
        this.isLoggedIn = data;
        this.changeDetectorRef.markForCheck();
      });
    this.subscriptions.add(subscription);
  }
}
