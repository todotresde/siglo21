import { Route } from '@angular/router';

import { ManufacturingOrderCustomProductComponent } from './manufacturingOrderCustomProduct.component';
import { ManufacturingOrderCustomProductListComponent } from './manufacturingOrderCustomProduct-list/manufacturingOrderCustomProduct-list.component';
import { ManufacturingOrderCustomProductDetailComponent } from './manufacturingOrderCustomProduct-detail/manufacturingOrderCustomProduct-detail.component';

import { ManufacturingOrderProductRoutes } from '../manufacturingOrderProduct/manufacturingOrderProduct.routes';

export const ManufacturingOrderCustomProductRoutes: Route[] = [
	{
		path: 'manufacturingOrderCustomProduct',
		children: [
            {
                path: ':id',
                children: [
                    {
                        path: '',    
                        component: ManufacturingOrderCustomProductComponent,
                        children: [
							...ManufacturingOrderProductRoutes
				    	]
                    }
				]
			}
    	]
	},{
		path: 'manufacturingOrderCustomProducts',
		component: ManufacturingOrderCustomProductListComponent
	}
];
