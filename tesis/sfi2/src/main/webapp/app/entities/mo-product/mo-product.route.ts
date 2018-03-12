import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MOProductComponent } from './mo-product.component';
import { MOProductDetailComponent } from './mo-product-detail.component';
import { MOProductPopupComponent } from './mo-product-dialog.component';
import { MOProductDeletePopupComponent } from './mo-product-delete-dialog.component';

export const mOProductRoute: Routes = [
    {
        path: 'mo-product',
        component: MOProductComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.mOProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mo-product/:id',
        component: MOProductDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.mOProduct.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mOProductPopupRoute: Routes = [
    {
        path: 'mo-product-new',
        component: MOProductPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.mOProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mo-product/:id/edit',
        component: MOProductPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.mOProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mo-product/:id/delete',
        component: MOProductDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.mOProduct.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
