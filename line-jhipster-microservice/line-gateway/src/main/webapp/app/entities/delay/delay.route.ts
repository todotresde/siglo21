import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DelayComponent } from './delay.component';
import { DelayDetailComponent } from './delay-detail.component';
import { DelayPopupComponent } from './delay-dialog.component';
import { DelayDeletePopupComponent } from './delay-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class DelayResolvePagingParams implements Resolve<any> {

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

export const delayRoute: Routes = [
  {
    path: 'delay',
    component: DelayComponent,
    resolve: {
      'pagingParams': DelayResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delay.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'delay/:id',
    component: DelayDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delay.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const delayPopupRoute: Routes = [
  {
    path: 'delay-new',
    component: DelayPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delay.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'delay/:id/edit',
    component: DelayPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delay.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'delay/:id/delete',
    component: DelayDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delay.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
