import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MOComponent } from './mo.component';
import { MODetailComponent } from './mo-detail.component';
import { MOPopupComponent } from './mo-dialog.component';
import { MODeletePopupComponent } from './mo-delete-dialog.component';

import { Principal } from '../../shared';


export const mORoute: Routes = [
  {
    path: 'mo',
    component: MOComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mO.home.title'
    }
  }, {
    path: 'mo/:id',
    component: MODetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mO.home.title'
    }
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
    outlet: 'popup'
  },
  {
    path: 'mo/:id/edit',
    component: MOPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mO.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'mo/:id/delete',
    component: MODeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.mO.home.title'
    },
    outlet: 'popup'
  }
];
