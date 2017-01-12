import { Route } from '@angular/router';

import { DelayComponent } from './delay.component';
import { DelayListComponent } from './delay-list/delay-list.component';
import { DelayDetailComponent } from './delay-detail/delay-detail.component';

export const DelayRoutes: Route[] = [
	{
		path: 'delay',
		component: DelayDetailComponent
	},{
		path: 'delay/:id',
		component: DelayDetailComponent
	},{
		path: 'delays',
		component: DelayListComponent
	}
];
