import { Route } from '@angular/router';

import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

export const UserRoutes: Route[] = [
	{
		path: 'user',
		component: UserDetailComponent
	},{
		path: 'user/:id',
		component: UserDetailComponent
	},{
		path: 'users',
		component: UserListComponent
	}
];
