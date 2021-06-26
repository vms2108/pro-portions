import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BasicDialogsModule } from 'src/app/ui/dialogs/basic-dialogs/basic-dialogs.module';
import { PasswordControlModule } from 'src/app/ui/form-controls/password-control/password-control.module';
import { TextControlModule } from 'src/app/ui/form-controls/text-control/text-control.module';
import { FormFieldsModule } from 'src/app/ui/form-fields/form-fields.module';
import { LoaderWithBackdropModule } from 'src/app/ui/loader-with-backdrop/loader-with-backdrop.module';
import { NotificationsModule } from 'src/app/ui/notifications/notifications.module';

import { FormLoginComponent } from './form-login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormFieldsModule,
    TextControlModule,
    PasswordControlModule,
    MatButtonModule,
    MatCardModule,
    LoaderWithBackdropModule,
    MatExpansionModule,
    MatIconModule,
    NotificationsModule,
    BasicDialogsModule,
    PasswordControlModule,
  ],

  declarations: [
    FormLoginComponent,
  ],

  exports: [
    FormLoginComponent,
  ],
})
export class FormLoginModule {
}
