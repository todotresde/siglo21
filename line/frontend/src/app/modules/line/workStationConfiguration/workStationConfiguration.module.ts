import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';

import { WorkStationConfigurationComponent } from './workStationConfiguration.component';
import { WorkStationConfigurationDetailComponent } from './workStationConfiguration-detail/workStationConfiguration-detail.component';
import { WorkStationConfigurationListComponent } from './workStationConfiguration-list/workStationConfiguration-list.component';
import { WorkStationUsersComponent } from './workStationUsers/workStationUsers.component';
import { WorkStationProductTypesComponent } from './workStationProductTypes/workStationProductTypes.component';

@NgModule({
    imports: [SharedModule],
    declarations: [WorkStationConfigurationComponent, WorkStationConfigurationDetailComponent, WorkStationConfigurationListComponent, WorkStationUsersComponent, WorkStationProductTypesComponent],
    exports: [WorkStationConfigurationComponent, WorkStationConfigurationDetailComponent, WorkStationConfigurationListComponent, WorkStationUsersComponent, WorkStationProductTypesComponent]
})
export class WorkStationConfigurationModule { }
