import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MOCustomProductComponent } from './mo-custom-product.component';
import { MOCustomProductDetailComponent } from './mo-custom-product-detail.component';
import { MOCustomProductPopupComponent } from './mo-custom-product-dialog.component';
import { MOCustomProductDeletePopupComponent } from './mo-custom-product-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class MOCustomProductResolvePagingParams implements Resolve<any> {

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

export const mOCustomProductRoute: Routes = [
  {
    path: 'mo-custom-product',
    component: MOCustomProductComponent,
    resolve: {
      'pagingParams': MOCustomProductResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOCustomProduct.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'mo-custom-product/:id',
    component: MOCustomProductDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOCustomProduct.home.title'
    },
    canActivate: [UserRouteAccessService]
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
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'mo-custom-product/:id/edit',
    component: MOCustomProductPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOCustomProduct.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'mo-custom-product/:id/delete',
    component: MOCustomProductDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mOCustomProduct.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
