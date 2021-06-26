import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocalStorageModule } from 'angular-2-local-storage';
import { ApiErrorsModule } from 'src/app/modules/api-errors/api-errors.module';
import { NotificationsModule } from 'src/app/ui/notifications/notifications.module';

import { AuthApiErrors } from './auth.api-errors';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    ApiErrorsModule,
    LocalStorageModule.forRoot({
      storageType: 'localStorage',
    }),
    NotificationsModule,
  ],

  providers: [
    AuthService,
    AuthApiErrors,
  ],
})
export class AuthCommonModule{
}
