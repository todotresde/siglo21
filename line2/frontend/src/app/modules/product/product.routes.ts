import { Route } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const ProductRoutes: Route[] = [
	{
		path: 'product',
		component: ProductDetailComponent
	},{
		path: 'product/:id',
		component: ProductDetailComponent
	},{
		path: 'products',
		component: ProductListComponent
	}
];
