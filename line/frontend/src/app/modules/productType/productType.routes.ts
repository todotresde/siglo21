import { Route } from '@angular/router';

import { ProductTypeComponent } from './productType.component';
import { ProductTypeListComponent } from './productType-list/productType-list.component';
import { ProductTypeDetailComponent } from './productType-detail/productType-detail.component';

export const ProductTypeRoutes: Route[] = [
	{
		path: 'productType',
		component: ProductTypeDetailComponent
	},{
		path: 'productType/:id',
		component: ProductTypeDetailComponent
	},{
		path: 'productTypes',
		component: ProductTypeListComponent
	}
];
