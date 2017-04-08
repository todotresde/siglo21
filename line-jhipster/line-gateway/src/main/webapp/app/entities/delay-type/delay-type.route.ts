import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DelayTypeComponent } from './delay-type.component';
import { DelayTypeDetailComponent } from './delay-type-detail.component';
import { DelayTypePopupComponent } from './delay-type-dialog.component';
import { DelayTypeDeletePopupComponent } from './delay-type-delete-dialog.component';

import { Principal } from '../../shared';


export const delayTypeRoute: Routes = [
  {
    path: 'delay-type',
    component: DelayTypeComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delayType.home.title'
    }
  }, {
    path: 'delay-type/:id',
    component: DelayTypeDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delayType.home.title'
    }
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
    outlet: 'popup'
  },
  {
    path: 'delay-type/:id/edit',
    component: DelayTypePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delayType.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'delay-type/:id/delete',
    component: DelayTypeDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delayType.home.title'
    },
    outlet: 'popup'
  }
];
