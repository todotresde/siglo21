import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MOCustomProductComponent } from './mo-custom-product.component';
import { MOCustomProductDetailComponent } from './mo-custom-product-detail.component';
import { MOCustomProductPopupComponent } from './mo-custom-product-dialog.component';
import { MOCustomProductDeletePopupComponent } from './mo-custom-product-delete-dialog.component';

import { Principal } from '../../shared';


export const mOCustomProductRoute: Routes = [
  {
    path: 'mo-custom-product',
    component: MOCustomProductComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOCustomProduct.home.title'
    }
  }, {
    path: 'mo-custom-product/:id',
    component: MOCustomProductDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOCustomProduct.home.title'
    }
  }
];

export const mOCustomProductPopupRoute: Routes = [
  {
    path: 'mo-custom-product-new',
    component: MOCustomProductPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOCustomProduct.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'mo-custom-product/:id/edit',
    component: MOCustomProductPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOCustomProduct.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'mo-custom-product/:id/delete',
    component: MOCustomProductDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOCustomProduct.home.title'
    },
    outlet: 'popup'
  }
];
