import { Route } from '@angular/router';

import { ManufacturingOrderProductComponent } from './manufacturingOrderProduct.component';
import { ManufacturingOrderProductListComponent } from './manufacturingOrderProduct-list/manufacturingOrderProduct-list.component';
import { ManufacturingOrderProductDetailComponent } from './manufacturingOrderProduct-detail/manufacturingOrderProduct-detail.component';

export const ManufacturingOrderProductRoutes: Route[] = [
	{
		path: 'manufacturingOrderProduct',
		component: ManufacturingOrderProductComponent,
		children: [
    	]
	},{
		path: 'manufacturingOrderProduct/:id',
		component: ManufacturingOrderProductComponent,
		children: [
    	]
	},{
		path: 'manufacturingOrderProducts',
		component: ManufacturingOrderProductListComponent
	}
];
