import { Route } from '@angular/router';

import { ManufacturingOrderCustomProductComponent } from './manufacturingOrderCustomProduct.component';
import { ManufacturingOrderCustomProductListComponent } from './manufacturingOrderCustomProduct-list/manufacturingOrderCustomProduct-list.component';
import { ManufacturingOrderCustomProductDetailComponent } from './manufacturingOrderCustomProduct-detail/manufacturingOrderCustomProduct-detail.component';

import { ManufacturingOrderProductRoutes } from '../manufacturingOrderProduct/manufacturingOrderProduct.routes';

export const ManufacturingOrderCustomProductRoutes: Route[] = [
	{
		path: 'manufacturingOrderCustomProduct',
		component: ManufacturingOrderCustomProductComponent,
		children: [
			...ManufacturingOrderProductRoutes
    	]
	},{
		path: 'manufacturingOrderCustomProduct/:id',
		component: ManufacturingOrderCustomProductComponent,
		children: [
    	]
	},{
		path: 'manufacturingOrderCustomProducts',
		component: ManufacturingOrderCustomProductListComponent
	}
];
