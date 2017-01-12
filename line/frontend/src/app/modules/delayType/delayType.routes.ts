import { Route } from '@angular/router';

import { DelayTypeComponent } from './delayType.component';
import { DelayTypeListComponent } from './delayType-list/delayType-list.component';
import { DelayTypeDetailComponent } from './delayType-detail/delayType-detail.component';

export const DelayTypeRoutes: Route[] = [
	{
		path: 'delayType',
		component: DelayTypeDetailComponent
	},{
		path: 'delayType/:id',
		component: DelayTypeDetailComponent
	},{
		path: 'delayTypes',
		component: DelayTypeListComponent
	}
];
