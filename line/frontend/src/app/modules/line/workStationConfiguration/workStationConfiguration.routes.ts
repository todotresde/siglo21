import { Route } from '@angular/router';

import { WorkStationConfigurationDetailComponent } from './workStationConfiguration-detail/workStationConfiguration-detail.component';
import { WorkStationConfigurationListComponent } from './workStationConfiguration-list/workStationConfiguration-list.component';


export const WorkStationConfigurationRoutes: Route[] = [
	{
		path: 'workStationConfiguration',
		component: WorkStationConfigurationDetailComponent
	},{
		path: 'workStationConfiguration/:id',
		component: WorkStationConfigurationDetailComponent
	},{
		path: 'workStationConfigurations/:lineId',
		component: WorkStationConfigurationListComponent
	}
];
