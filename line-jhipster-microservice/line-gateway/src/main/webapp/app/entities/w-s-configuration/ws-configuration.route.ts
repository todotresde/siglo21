import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { WSConfigurationComponent } from './ws-configuration.component';
import { WSConfigurationDetailComponent } from './ws-configuration-detail.component';
import { WSConfigurationPopupComponent } from './ws-configuration-dialog.component';
import { WSConfigurationDeletePopupComponent } from './ws-configuration-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class WSConfigurationResolvePagingParams implements Resolve<any> {

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

export const wSConfigurationRoute: Routes = [
  {
    path: 'ws-configuration',
    component: WSConfigurationComponent,
    resolve: {
      'pagingParams': WSConfigurationResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.wSConfiguration.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'ws-configuration/:id',
    component: WSConfigurationDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.wSConfiguration.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const wSConfigurationPopupRoute: Routes = [
  {
    path: 'ws-configuration-new',
    component: WSConfigurationPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.wSConfiguration.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'ws-configuration/:id/edit',
    component: WSConfigurationPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.wSConfiguration.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'ws-configuration/:id/delete',
    component: WSConfigurationDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.wSConfiguration.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
