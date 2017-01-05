import { Route } from '@angular/router';

import { ManufacturingOrderComponent } from './manufacturingOrder.component';
import { ManufacturingOrderListComponent } from './manufacturingOrder-list/manufacturingOrder-list.component';
import { ManufacturingOrderDetailComponent } from './manufacturingOrder-detail/manufacturingOrder-detail.component';

export const ManufacturingOrderRoutes: Route[] = [
	{
		path: 'manufacturingOrder',
		component: ManufacturingOrderDetailComponent,
		children: [
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
