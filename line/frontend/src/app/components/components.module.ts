import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';

import { ListComponent } from './list/list.component';

@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [ListComponent],
  exports: [ListComponent]
})
export class ComponentsModule { }
