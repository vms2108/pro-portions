import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { TagSearchControlComponent } from './tag-search-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
  ],

  declarations: [
    TagSearchControlComponent,
  ],

  exports: [
    TagSearchControlComponent,
  ],
})
export class TagSearchControlModule {
}
