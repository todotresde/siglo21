import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PTAttributeComponent } from './pt-attribute.component';
import { PTAttributeDetailComponent } from './pt-attribute-detail.component';
import { PTAttributePopupComponent } from './pt-attribute-dialog.component';
import { PTAttributeDeletePopupComponent } from './pt-attribute-delete-dialog.component';

export const pTAttributeRoute: Routes = [
    {
        path: 'pt-attribute',
        component: PTAttributeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.pTAttribute.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pt-attribute/:id',
        component: PTAttributeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.pTAttribute.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pTAttributePopupRoute: Routes = [
    {
        path: 'pt-attribute-new',
        component: PTAttributePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.pTAttribute.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pt-attribute/:id/edit',
        component: PTAttributePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.pTAttribute.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pt-attribute/:id/delete',
        component: PTAttributeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.pTAttribute.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
