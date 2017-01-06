import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { WorkStationConfigurationComponent } from './workStationConfiguration.component';
import { WorkStationConfigurationDetailComponent } from './workStationConfiguration-detail/workStationConfiguration-detail.component';
import { WorkStationConfigurationListComponent } from './workStationConfiguration-list/workStationConfiguration-list.component';
import { WorkStationUsersComponent } from './workStationUsers/workStationUsers.component';
import { WorkStationProductTypesComponent } from './workStationProductTypes/workStationProductTypes.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, NgbModule],
    declarations: [WorkStationConfigurationComponent, WorkStationConfigurationDetailComponent, WorkStationConfigurationListComponent, WorkStationUsersComponent, WorkStationProductTypesComponent],
    exports: [WorkStationConfigurationComponent, WorkStationConfigurationDetailComponent, WorkStationConfigurationListComponent, WorkStationUsersComponent, WorkStationProductTypesComponent]
})
export class WorkStationConfigurationModule { }
