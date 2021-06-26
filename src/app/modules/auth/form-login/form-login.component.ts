import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TitleService } from 'src/app/root-components/header/common/title.service';

import { NotificationsService } from './../../../ui/notifications/notifications.service';
import { AuthService } from './../common/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: 'form-login.component.html',
  styleUrls: ['form-login.component.scss'],
})
export class FormLoginComponent implements OnInit, OnDestroy {

  public readonly LOGIN_MAX_LENGTH = 50;

  public readonly LOGIN_MIN_LENGTH = 3;

  public loginForm = new FormGroup({});

  public newPasswordForm = new FormGroup({});

  public needNewPassword = false;

  public loading = false;

  private subscriptions = new Subscription();

  private returnUrl!: string;

  private readonly TITLE = 'Авторизация';

  constructor(
        private formBuilder: FormBuilder,
        private changeDetectorRef: ChangeDetectorRef,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: TitleService,
        private notificationsService: NotificationsService,
      ) {
    this.titleService.setTitle(this.TITLE);
  }

  public get passwordComplexity(): boolean {
    const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&/,><\’:;|_~`])\S{6,99}$/;
    return regExp.test(this.loginForm.get('newPassword')!.value);
  }

  public ngOnInit(): void {
    this.createForm();
    this.checkAuth();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public submitLogin(): void {
    const login = this.loginForm.get('login')!.value;
    const password = this.loginForm.get('password')!.value;
    const newPassword = this.loginForm.get('newPassword')!.value;
    this.authService.login(login, password, newPassword)
      .subscribe(data => {
        this.needNewPassword = data.type === 'newPasswordRequired';
        if (data.type === 'passwordChanged') {
          this.passwordChanged();
        }
      },         error => {
        this.notificationsService.error(error.message);
      });
  }

  public hasErrorInCommonDataForm(controlName: string, errorCode: string): boolean {
    const control = this.loginForm.get(controlName)!;

    return control.dirty && control.hasError(errorCode);
  }

  public formDisabled(): boolean {
    return this.loginForm.invalid
      || this.loading
      || (this.needNewPassword && !this.passwordComplexity);
  }

  private passwordChanged(): void {
    this.notificationsService.success('Пароль успешно изменён. Можете авторизоваться с новым паролем');
    this.loginForm.reset({ login: null, password: null });
  }

  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [
        Validators.required,
        Validators.minLength(this.LOGIN_MIN_LENGTH),
        Validators.maxLength(this.LOGIN_MAX_LENGTH),
      ]],
      password: ['', [Validators.required]],
      newPassword: ['', []],
    });

    const refreshViewSubscription = this.loginForm.valueChanges.subscribe(() => this.changeDetectorRef.markForCheck());
    this.subscriptions.add(refreshViewSubscription);
  }

  private checkAuth(): void {
    if (this.authService.isLoggedIn) {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigate([this.returnUrl]);
    }
  }
}
