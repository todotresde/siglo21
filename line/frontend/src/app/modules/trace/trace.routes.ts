import { Route } from '@angular/router';

import { TraceComponent } from './trace.component';
import { TraceDetailComponent } from './trace-detail/trace-detail.component';

export const TraceRoutes: Route[] = [
	{
		path: 'trace',
		component: TraceComponent,
		children: [
    	]
	},{
		path: 'trace/:id',
		component: TraceComponent,
		children: [
    	]
	}
];