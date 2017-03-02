import { Route } from '@angular/router';

import { RouteComponent } from './route.component';
import { RouteListComponent } from './route-list/route-list.component';
import { RouteDetailComponent } from './route-detail/route-detail.component';

export const RouteRoutes: Route[] = [
	{
		path: 'route',
		component: RouteDetailComponent
	},{
		path: 'route/:id',
		component: RouteDetailComponent
	},{
		path: 'routes',
		component: RouteListComponent
	}
];
