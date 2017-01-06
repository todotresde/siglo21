import { Route } from '@angular/router';

import { UserRoutes } from './user/user.routes';
import { WorkStationRoutes } from './workStation/workStation.routes';
import { ProductRoutes } from './product/product.routes';
import { ProductTypeRoutes } from './productType/productType.routes';
import { LineRoutes } from './line/line.routes';
import { ManufacturingOrderRoutes } from './manufacturingOrder/manufacturingOrder.routes';

import { ModulesComponent } from './modules.component';

export const ModulesRoutes: Route[] = [
  	{
    	path: 'modules',
    	component: ModulesComponent,
    	children: [
	    	...UserRoutes,
	    	...WorkStationRoutes,
	    	...ProductRoutes,
        ...ProductTypeRoutes,
			  ...LineRoutes,
        ...ManufacturingOrderRoutes
    	]
  	}
];
