import { Route } from '@angular/router';

import { ManufacturingOrderComponent } from './manufacturingOrder.component';
import { ManufacturingOrderListComponent } from './manufacturingOrder-list/manufacturingOrder-list.component';
import { ManufacturingOrderDetailComponent } from './manufacturingOrder-detail/manufacturingOrder-detail.component';

import { ManufacturingOrderCustomProductRoutes } from './manufacturingOrderCustomProduct/manufacturingOrderCustomProduct.routes';

export const ManufacturingOrderRoutes: Route[] = [
	{
		path: 'manufacturingOrder',
		component: ManufacturingOrderDetailComponent,
		children: [
			...ManufacturingOrderCustomProductRoutes
    	]
	},{
		path: 'manufacturingOrder/:id',
		component: ManufacturingOrderDetailComponent,
		children: [
    	]
	},{
		path: 'manufacturingOrders',
		component: ManufacturingOrderListComponent
	}
];
