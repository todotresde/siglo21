import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { LineComponent } from './line.component';
import { LineDetailComponent } from './line-detail.component';
import { LinePopupComponent } from './line-dialog.component';
import { LineDeletePopupComponent } from './line-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class LineResolvePagingParams implements Resolve<any> {

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

export const lineRoute: Routes = [
  {
    path: 'line',
    component: LineComponent,
    resolve: {
      'pagingParams': LineResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.line.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'line/:id',
    component: LineDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.line.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const linePopupRoute: Routes = [
  {
    path: 'line-new',
    component: LinePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.line.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'line/:id/edit',
    component: LinePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.line.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'line/:id/delete',
    component: LineDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.line.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
