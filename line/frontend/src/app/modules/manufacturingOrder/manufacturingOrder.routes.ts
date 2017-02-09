import { Route } from '@angular/router';

import { ManufacturingOrderComponent } from './manufacturingOrder.component';
import { ManufacturingOrderListComponent } from './manufacturingOrder-list/manufacturingOrder-list.component';
import { ManufacturingOrderDetailComponent } from './manufacturingOrder-detail/manufacturingOrder-detail.component';

import { ManufacturingOrderCustomProductComponent } from './manufacturingOrderCustomProduct/manufacturingOrderCustomProduct.component';
import { ManufacturingOrderCustomProductListComponent } from './manufacturingOrderCustomProduct/manufacturingOrderCustomProduct-list/manufacturingOrderCustomProduct-list.component';
import { ManufacturingOrderCustomProductDetailComponent } from './manufacturingOrderCustomProduct/manufacturingOrderCustomProduct-detail/manufacturingOrderCustomProduct-detail.component';

import { ManufacturingOrderQueryComponent } from './manufacturingOrderQuery/manufacturingOrderQuery.component';
import { ManufacturingOrderQueryDetailComponent } from './manufacturingOrderQuery/manufacturingOrderQuery-detail/manufacturingOrderQuery-detail.component';

import { ManufacturingOrderCustomProductRoutes } from './manufacturingOrderCustomProduct/manufacturingOrderCustomProduct.routes';

export const ManufacturingOrderRoutes: Route[] = [
	{
		path: 'manufacturingOrder',
		children: [
            {
                path: ':id',
                children: [
                    {
                        path: '',    
                        component: ManufacturingOrderDetailComponent,
                    },{
						path: 'manufacturingOrderCustomProduct',
						component: ManufacturingOrderCustomProductComponent,
						children: [
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
				]
			}
    	]
	},{
		path: 'manufacturingOrders',
		component: ManufacturingOrderListComponent
	},{
		path: 'manufacturingOrderQuery',
		component: ManufacturingOrderQueryComponent,
		children: []
	},{
		path: 'manufacturingOrderQuery/:id',
		component: ManufacturingOrderQueryDetailComponent,
		children: []
	}
];
