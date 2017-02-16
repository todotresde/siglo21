import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';
import { WorkStationConfigurationModule } from './workStationConfiguration/workStationConfiguration.module';

import { LineComponent } from './line.component';
import { LineListComponent } from './line-list/line-list.component';
import { LineDetailComponent } from './line-detail/line-detail.component';

@NgModule({
    imports: [WorkStationConfigurationModule, SharedModule],
    declarations: [LineComponent, LineListComponent, LineDetailComponent],
    exports: [LineComponent, LineListComponent, LineDetailComponent, ]
})

export class LineModule { }
