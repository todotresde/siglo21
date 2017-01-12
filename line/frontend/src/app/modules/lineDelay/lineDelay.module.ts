import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { LineDelayComponent } from './lineDelay.component';
import { LineDelayListComponent } from './lineDelay-list/lineDelay-list.component';
import { LineDelayDetailComponent } from './lineDelay-detail/lineDelay-detail.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, SharedModule],
    declarations: [LineDelayComponent, LineDelayListComponent, LineDelayDetailComponent],
    exports: [LineDelayComponent, LineDelayListComponent, LineDelayDetailComponent]
})

export class LineDelayModule { }
