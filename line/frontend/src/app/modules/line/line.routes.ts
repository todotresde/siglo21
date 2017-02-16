import { Route } from '@angular/router';

import { LineComponent, LineListComponent, LineDetailComponent, WorkStationConfigurationRoutes } from 'app/modules/line';

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
