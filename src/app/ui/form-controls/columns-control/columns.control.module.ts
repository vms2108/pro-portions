import { SelectSearchControlModule } from './../select-search-control/select-search-control.module';
import { SelectControlModule } from './../select-control/select-control.module';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormFieldsModule } from '../../form-fields/form-fields.module';
import { ColumnsControlComponent } from './columns-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SelectControlModule,
    SelectSearchControlModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormFieldsModule,
  ],
  declarations: [
    ColumnsControlComponent,
  ],
  exports: [
    ColumnsControlComponent,
  ],
})
export class ColumnsControlModule {}
