import { Route } from '@angular/router';

import { RoleComponent } from './role.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';

export const RoleRoutes: Route[] = [
	{
		path: 'role',
		component: RoleDetailComponent
	},{
		path: 'role/:id',
		component: RoleDetailComponent
	},{
		path: 'roles',
		component: RoleListComponent
	}
];
