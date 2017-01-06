import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { WorkStationConfigurationModule } from './workStationConfiguration/workStationConfiguration.module';

import { LineComponent } from './line.component';
import { LineListComponent } from './line-list/line-list.component';
import { LineDetailComponent } from './line-detail/line-detail.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, NgbModule, WorkStationConfigurationModule],
    declarations: [LineComponent, LineListComponent, LineDetailComponent],
    exports: [LineComponent, LineListComponent, LineDetailComponent, ]
})

export class LineModule { }
