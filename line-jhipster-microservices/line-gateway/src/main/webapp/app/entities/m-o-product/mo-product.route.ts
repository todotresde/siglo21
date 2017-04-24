import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MOProductComponent } from './mo-product.component';
import { MOProductDetailComponent } from './mo-product-detail.component';
import { MOProductPopupComponent } from './mo-product-dialog.component';
import { MOProductDeletePopupComponent } from './mo-product-delete-dialog.component';

import { Principal } from '../../shared';


export const mOProductRoute: Routes = [
  {
    path: 'mo-product',
    component: MOProductComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOProduct.home.title'
    }
  }, {
    path: 'mo-product/:id',
    component: MOProductDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOProduct.home.title'
    }
  }
];

export const mOProductPopupRoute: Routes = [
  {
    path: 'mo-product-new',
    component: MOProductPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOProduct.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'mo-product/:id/edit',
    component: MOProductPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOProduct.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'mo-product/:id/delete',
    component: MOProductDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOProduct.home.title'
    },
    outlet: 'popup'
  }
];
