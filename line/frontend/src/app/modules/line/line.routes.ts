import { Route } from '@angular/router';

import { WorkStationConfigurationRoutes } from './workStationConfiguration/workStationConfiguration.routes';

import { LineComponent } from './line.component';
import { LineListComponent } from './line-list/line-list.component';
import { LineDetailComponent } from './line-detail/line-detail.component';

export const LineRoutes: Route[] = [
	{
		path: 'line',
		component: LineDetailComponent,
		children: [
	    	...WorkStationConfigurationRoutes
    	]
	},{
		path: 'line/:id',
		component: LineDetailComponent,
		children: [
	    	...WorkStationConfigurationRoutes
    	]
	},{
		path: 'lines',
		component: LineComponent
	}
];
