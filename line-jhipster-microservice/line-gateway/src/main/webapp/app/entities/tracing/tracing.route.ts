import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TracingComponent } from './tracing.component';
import { TracingDetailComponent } from './tracing-detail.component';
import { TracingPopupComponent } from './tracing-dialog.component';
import { TracingDeletePopupComponent } from './tracing-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class TracingResolvePagingParams implements Resolve<any> {

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

export const tracingRoute: Routes = [
  {
    path: 'tracing',
    component: TracingComponent,
    resolve: {
      'pagingParams': TracingResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.tracing.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'tracing/:id',
    component: TracingDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.tracing.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tracingPopupRoute: Routes = [
  {
    path: 'tracing-new',
    component: TracingPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.tracing.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'tracing/:id/edit',
    component: TracingPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.tracing.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'tracing/:id/delete',
    component: TracingDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.tracing.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
