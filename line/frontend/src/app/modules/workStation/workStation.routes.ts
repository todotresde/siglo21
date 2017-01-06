import { Route } from '@angular/router';

import { WorkStationComponent } from './workStation.component';
import { WorkStationListComponent } from './workStation-list/workStation-list.component';
import { WorkStationDetailComponent } from './workStation-detail/workStation-detail.component';

export const WorkStationRoutes: Route[] = [
	{
		path: 'workStation',
		component: WorkStationDetailComponent
	},{
		path: 'workStation/:id',
		component: WorkStationDetailComponent
	},{
		path: 'workStations',
		component: WorkStationListComponent
	}
];
