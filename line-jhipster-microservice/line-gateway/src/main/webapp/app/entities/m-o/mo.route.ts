import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MOComponent } from './mo.component';
import { MODetailComponent } from './mo-detail.component';
import { MOPopupComponent } from './mo-dialog.component';
import { MODeletePopupComponent } from './mo-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class MOResolvePagingParams implements Resolve<any> {

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

export const mORoute: Routes = [
  {
    path: 'mo',
    component: MOComponent,
    resolve: {
      'pagingParams': MOResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mO.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'mo/:id',
    component: MODetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mO.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const mOPopupRoute: Routes = [
  {
    path: 'mo-new',
    component: MOPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mO.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'mo/:id/edit',
    component: MOPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mO.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'mo/:id/delete',
    component: MODeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mO.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
