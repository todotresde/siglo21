import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { LineModule } from '../line/line.module';
import { DelayModule } from '../delay/delay.module';

import { LineDelayComponent } from './lineDelay.component';
import { LineDelayListComponent } from './lineDelay-list/lineDelay-list.component';
import { LineDelayDetailComponent } from './lineDelay-detail/lineDelay-detail.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, LineModule, DelayModule, SharedModule],
    declarations: [LineDelayComponent, LineDelayListComponent, LineDelayDetailComponent],
    exports: [LineDelayComponent, LineDelayListComponent, LineDelayDetailComponent]
})

export class LineDelayModule { }
