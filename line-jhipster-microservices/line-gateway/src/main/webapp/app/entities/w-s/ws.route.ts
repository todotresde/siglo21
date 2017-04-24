import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { WSComponent } from './ws.component';
import { WSDetailComponent } from './ws-detail.component';
import { WSPopupComponent } from './ws-dialog.component';
import { WSDeletePopupComponent } from './ws-delete-dialog.component';

import { Principal } from '../../shared';


export const wSRoute: Routes = [
  {
    path: 'ws',
    component: WSComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.wS.home.title'
    }
  }, {
    path: 'ws/:id',
    component: WSDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.wS.home.title'
    }
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
    outlet: 'popup'
  },
  {
    path: 'ws/:id/edit',
    component: WSPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.wS.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'ws/:id/delete',
    component: WSDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.wS.home.title'
    },
    outlet: 'popup'
  }
];
