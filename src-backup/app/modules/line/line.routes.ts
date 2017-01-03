import { Route } from '@angular/router';

import { LineComponent } from './line.component';
import { LineListComponent } from './line-list/line-list.component';
import { LineDetailComponent } from './line-detail/line-detail.component';

export const LineRoutes: Route[] = [
	{
		path: 'line',
		component: LineDetailComponent
	},{
		path: 'line/:id',
		component: LineDetailComponent
	},{
		path: 'lines',
		component: LineListComponent
	}
];
