import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { WorkStationComponent } from './workStation.component';
import { WorkStationListComponent } from './workStation-list/workStation-list.component';
import { WorkStationDetailComponent } from './workStation-detail/workStation-detail.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, SharedModule],
    declarations: [WorkStationComponent, WorkStationListComponent, WorkStationDetailComponent],
    exports: [WorkStationComponent, WorkStationListComponent, WorkStationDetailComponent]
})

export class WorkStationModule { }
