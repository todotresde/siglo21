import { Route } from '@angular/router';

import { LineDelayComponent } from './lineDelay.component';
import { LineDelayListComponent } from './lineDelay-list/lineDelay-list.component';
import { LineDelayDetailComponent } from './lineDelay-detail/lineDelay-detail.component';

export const LineDelayRoutes: Route[] = [
	{
		path: 'lineDelay',
		component: LineDelayDetailComponent
	},{
		path: 'lineDelay/:id',
		component: LineDelayDetailComponent
	},{
		path: 'lineDelays',
		component: LineDelayListComponent
	}
];
