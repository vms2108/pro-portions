import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormFieldsModule } from '../../form-fields/form-fields.module';

import { NumberControlComponent } from './number-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormFieldsModule,
  ],

  declarations: [
    NumberControlComponent,
  ],

  exports: [
    NumberControlComponent,
  ],
})
export class NumberControlModule {
}
