import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MOProductComponent } from './mo-product.component';
import { MOProductDetailComponent } from './mo-product-detail.component';
import { MOProductPopupComponent } from './mo-product-dialog.component';
import { MOProductDeletePopupComponent } from './mo-product-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class MOProductResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: PaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
      let sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
      return {
          page: this.paginationUtil.parsePage(page),
          predicate: this.paginationUtil.parsePredicate(sort),
          ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

export const mOProductRoute: Routes = [
  {
    path: 'mo-product',
    component: MOProductComponent,
    resolve: {
      'pagingParams': MOProductResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOProduct.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'mo-product/:id',
    component: MOProductDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOProduct.home.title'
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
        pageTitle: 'lineGatewayApp.mOProduct.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'mo-product/:id/edit',
    component: MOProductPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOProduct.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'mo-product/:id/delete',
    component: MOProductDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOProduct.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
