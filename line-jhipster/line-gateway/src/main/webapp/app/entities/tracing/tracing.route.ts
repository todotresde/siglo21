import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TracingComponent } from './tracing.component';
import { TracingDetailComponent } from './tracing-detail.component';
import { TracingPopupComponent } from './tracing-dialog.component';
import { TracingDeletePopupComponent } from './tracing-delete-dialog.component';

import { Principal } from '../../shared';


export const tracingRoute: Routes = [
  {
    path: 'tracing',
    component: TracingComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.tracing.home.title'
    }
  }, {
    path: 'tracing/:id',
    component: TracingDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.tracing.home.title'
    }
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
    outlet: 'popup'
  },
  {
    path: 'tracing/:id/edit',
    component: TracingPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.tracing.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'tracing/:id/delete',
    component: TracingDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'lineGatewayApp.tracing.home.title'
    },
    outlet: 'popup'
  }
];
