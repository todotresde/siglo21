import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { TraceComponent } from './trace.component';
import { TraceDetailComponent } from './trace-detail/trace-detail.component';
import { TraceListComponent } from './trace-list/trace-list.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, SharedModule],
    declarations: [TraceComponent, TraceDetailComponent, TraceListComponent],
    exports: [TraceComponent, TraceDetailComponent, TraceListComponent]
})

export class TraceModule { }
