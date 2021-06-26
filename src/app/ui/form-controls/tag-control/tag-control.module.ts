import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { TagControlComponent } from './tag-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
  ],

  declarations: [
    TagControlComponent,
  ],

  exports: [
    TagControlComponent,
  ],
})
export class TagControlModule {
}
