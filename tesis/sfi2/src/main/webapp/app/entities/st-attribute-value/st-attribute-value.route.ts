import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { STAttributeValueComponent } from './st-attribute-value.component';
import { STAttributeValueDetailComponent } from './st-attribute-value-detail.component';
import { STAttributeValuePopupComponent } from './st-attribute-value-dialog.component';
import { STAttributeValueDeletePopupComponent } from './st-attribute-value-delete-dialog.component';

export const sTAttributeValueRoute: Routes = [
    {
        path: 'st-attribute-value',
        component: STAttributeValueComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.sTAttributeValue.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'st-attribute-value/:id',
        component: STAttributeValueDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.sTAttributeValue.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sTAttributeValuePopupRoute: Routes = [
    {
        path: 'st-attribute-value-new',
        component: STAttributeValuePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.sTAttributeValue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'st-attribute-value/:id/edit',
        component: STAttributeValuePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.sTAttributeValue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'st-attribute-value/:id/delete',
        component: STAttributeValueDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'sfi2App.sTAttributeValue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
