import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { DelayModule } from '../delay/delay.module';

import { TraceComponent } from './trace.component';
import { TraceDetailComponent } from './trace-detail/trace-detail.component';
import { TraceListComponent } from './trace-list/trace-list.component';
import { TraceDelayComponent } from './trace-delay/trace-delay.component';
import { WorkStationDelayComponent } from './workStation-delay/workStation-delay.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, SharedModule, DelayModule],
    declarations: [TraceComponent, TraceDetailComponent, TraceListComponent, TraceDelayComponent, WorkStationDelayComponent],
    exports: [TraceComponent, TraceDetailComponent, TraceListComponent, TraceDelayComponent, WorkStationDelayComponent]
})

export class TraceModule { }
