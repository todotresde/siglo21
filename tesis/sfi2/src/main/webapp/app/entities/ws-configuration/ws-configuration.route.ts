import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { WSConfigurationComponent } from './ws-configuration.component';
import { WSConfigurationDetailComponent } from './ws-configuration-detail.component';
import { WSConfigurationPopupComponent } from './ws-configuration-dialog.component';
import { WSConfigurationDeletePopupComponent } from './ws-configuration-delete-dialog.component';

export const wSConfigurationRoute: Routes = [
    {
        path: 'ws-configuration',
        component: WSConfigurationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.wSConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ws-configuration/:id',
        component: WSConfigurationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.wSConfiguration.home.title'
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
            pageTitle: 'sfi2App.wSConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ws-configuration/:id/edit',
        component: WSConfigurationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.wSConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ws-configuration/:id/delete',
        component: WSConfigurationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.wSConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
