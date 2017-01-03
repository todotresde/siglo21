import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { LineComponent } from './line.component';
import { LineListComponent } from './line-list/line-list.component';
import { LineDetailComponent } from './line-detail/line-detail.component';
import { WorkStationConfigurationComponent } from './line-detail/workStationConfiguration/workStationConfiguration.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, NgbModule],
    declarations: [LineComponent, LineListComponent, LineDetailComponent, WorkStationConfigurationComponent],
    exports: [LineComponent, LineListComponent, LineDetailComponent, WorkStationConfigurationComponent]
})

export class LineModule { }
