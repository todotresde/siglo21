import { Route } from '@angular/router';

import { UserComponent } from './user.component';

export const UserRoutes: Route[] = [
	{
		path: 'user/:id',
		component: UserComponent
	},{
		path: 'user',
		component: UserComponent
	},
];
