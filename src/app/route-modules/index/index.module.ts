import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { IndexComponent } from './index.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
  ],

  declarations: [
    IndexComponent,
  ],

  exports: [
    IndexComponent,
  ],
})
export class IndexModule {}
