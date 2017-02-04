import { Route } from '@angular/router';

import { UserRoutes } from './user/user.routes';
import { RoleRoutes } from './role/role.routes';
import { WorkStationRoutes } from './workStation/workStation.routes';
import { ProductRoutes } from './product/product.routes';
import { ProductTypeRoutes } from './productType/productType.routes';
import { LineRoutes } from './line/line.routes';
import { ManufacturingOrderRoutes } from './manufacturingOrder/manufacturingOrder.routes';
import { TraceRoutes } from './trace/trace.routes';
import { DelayRoutes } from './delay/delay.routes';
import { DelayTypeRoutes } from './delayType/delayType.routes';
import { LineDelayRoutes } from './lineDelay/lineDelay.routes';
import { DashboardRoutes } from './dashboard/dashboard.routes';

import { ModulesComponent } from './modules.component';

export const ModulesRoutes: Route[] = [
  	{
    	path: 'modules',
    	component: ModulesComponent,
    	children: [
	    	...UserRoutes,
            ...RoleRoutes,
	    	...WorkStationRoutes,
	    	...ProductRoutes,
            ...ProductTypeRoutes,
			...LineRoutes,
            ...ManufacturingOrderRoutes,
            ...TraceRoutes,
            ...DelayRoutes,
            ...DelayTypeRoutes,
            ...LineDelayRoutes,
            ...DashboardRoutes
    	]
  	}
];
