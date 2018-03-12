import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { STAttributeComponent } from './st-attribute.component';
import { STAttributeDetailComponent } from './st-attribute-detail.component';
import { STAttributePopupComponent } from './st-attribute-dialog.component';
import { STAttributeDeletePopupComponent } from './st-attribute-delete-dialog.component';

export const sTAttributeRoute: Routes = [
    {
        path: 'st-attribute',
        component: STAttributeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.sTAttribute.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'st-attribute/:id',
        component: STAttributeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.sTAttribute.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sTAttributePopupRoute: Routes = [
    {
        path: 'st-attribute-new',
        component: STAttributePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.sTAttribute.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'st-attribute/:id/edit',
        component: STAttributePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.sTAttribute.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'st-attribute/:id/delete',
        component: STAttributeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.sTAttribute.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
