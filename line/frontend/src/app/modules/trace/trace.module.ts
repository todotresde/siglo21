import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';
import { DelayModule } from 'app/modules/delay';

import { TraceComponent } from './trace.component';
import { TraceDetailComponent } from './trace-detail/trace-detail.component';
import { TraceListComponent } from './trace-list/trace-list.component';
import { TraceDelayComponent } from './trace-delay/trace-delay.component';
import { WorkStationDelayComponent } from './workStation-delay/workStation-delay.component';

@NgModule({
    imports: [SharedModule, DelayModule],
    declarations: [TraceComponent, TraceDetailComponent, TraceListComponent, TraceDelayComponent, WorkStationDelayComponent],
    exports: [TraceComponent, TraceDetailComponent, TraceListComponent, TraceDelayComponent, WorkStationDelayComponent]
})

export class TraceModule { }
