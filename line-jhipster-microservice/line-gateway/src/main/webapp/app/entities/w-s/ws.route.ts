import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { WSComponent } from './ws.component';
import { WSDetailComponent } from './ws-detail.component';
import { WSPopupComponent } from './ws-dialog.component';
import { WSDeletePopupComponent } from './ws-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class WSResolvePagingParams implements Resolve<any> {

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

export const wSRoute: Routes = [
  {
    path: 'ws',
    component: WSComponent,
    resolve: {
      'pagingParams': WSResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.wS.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'ws/:id',
    component: WSDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.wS.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const wSPopupRoute: Routes = [
  {
    path: 'ws-new',
    component: WSPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.wS.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'ws/:id/edit',
    component: WSPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.wS.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'ws/:id/delete',
    component: WSDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.wS.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
