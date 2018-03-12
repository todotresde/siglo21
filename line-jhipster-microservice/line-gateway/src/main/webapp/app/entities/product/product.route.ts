import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductPopupComponent } from './product-dialog.component';
import { ProductDeletePopupComponent } from './product-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ProductResolvePagingParams implements Resolve<any> {

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

export const productRoute: Routes = [
  {
    path: 'product',
    component: ProductComponent,
    resolve: {
      'pagingParams': ProductResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.product.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'product/:id',
    component: ProductDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.product.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const productPopupRoute: Routes = [
  {
    path: 'product-new',
    component: ProductPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.product.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'product/:id/edit',
    component: ProductPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.product.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'product/:id/delete',
    component: ProductDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.product.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
