import { Route } from '@angular/router';

import { TraceComponent } from './trace.component';
import { TraceDetailComponent } from './trace-detail/trace-detail.component';
import { TraceDelayComponent } from './trace-delay/trace-delay.component';
import { WorkStationDelayComponent } from './workStation-delay/workStation-delay.component';

export const TraceRoutes: Route[] = [
	{
		path: 'trace',
		component: TraceComponent,
		children: [
    	]
	},{
		path: 'trace/line/:lineId/workStation/:workStationId',
		component: TraceComponent,
		children: [
    	]
	},{
		path: 'trace/line/:lineId/workStation/:workStationId/tracesDelay',
		component: TraceDelayComponent,
		children: [
    	]
	},{
		path: 'trace/line/:lineId/workStation/:workStationId/workStationDelay',
		component: WorkStationDelayComponent,
		children: [
    	]
	}
];
