import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { WorkStationConfigurationModule } from './workStationConfiguration/workStationConfiguration.module';

import { LineComponent } from './line.component';
import { LineListComponent } from './line-list/line-list.component';
import { LineDetailComponent } from './line-detail/line-detail.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, WorkStationConfigurationModule, SharedModule],
    declarations: [LineComponent, LineListComponent, LineDetailComponent],
    exports: [LineComponent, LineListComponent, LineDetailComponent, ]
})

export class LineModule { }
