import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextMaskModule } from 'angular2-text-mask';
import { FormFieldsModule } from 'src/app/ui/form-fields/form-fields.module';

import { DateControlComponent } from './date-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TextMaskModule,
    FormFieldsModule,
  ],

  providers: [
    MatDatepickerModule,
  ],

  declarations: [
    DateControlComponent,
  ],

  exports: [
    DateControlComponent,
  ],
})
export class DateControlModule {
}
