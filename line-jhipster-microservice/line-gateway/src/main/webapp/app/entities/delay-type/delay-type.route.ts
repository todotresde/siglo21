import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DelayTypeComponent } from './delay-type.component';
import { DelayTypeDetailComponent } from './delay-type-detail.component';
import { DelayTypePopupComponent } from './delay-type-dialog.component';
import { DelayTypeDeletePopupComponent } from './delay-type-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class DelayTypeResolvePagingParams implements Resolve<any> {

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

export const delayTypeRoute: Routes = [
  {
    path: 'delay-type',
    component: DelayTypeComponent,
    resolve: {
      'pagingParams': DelayTypeResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delayType.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'delay-type/:id',
    component: DelayTypeDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delayType.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const delayTypePopupRoute: Routes = [
  {
    path: 'delay-type-new',
    component: DelayTypePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delayType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'delay-type/:id/edit',
    component: DelayTypePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delayType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'delay-type/:id/delete',
    component: DelayTypeDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delayType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
