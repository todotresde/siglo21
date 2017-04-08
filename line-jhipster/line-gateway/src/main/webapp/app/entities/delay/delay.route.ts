import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DelayComponent } from './delay.component';
import { DelayDetailComponent } from './delay-detail.component';
import { DelayPopupComponent } from './delay-dialog.component';
import { DelayDeletePopupComponent } from './delay-delete-dialog.component';

import { Principal } from '../../shared';


export const delayRoute: Routes = [
  {
    path: 'delay',
    component: DelayComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delay.home.title'
    }
  }, {
    path: 'delay/:id',
    component: DelayDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delay.home.title'
    }
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
    outlet: 'popup'
  },
  {
    path: 'delay/:id/edit',
    component: DelayPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delay.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'delay/:id/delete',
    component: DelayDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.delay.home.title'
    },
    outlet: 'popup'
  }
];
