import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LineGatewaySharedModule } from '../../shared';

import {
    DelayTypeService,
    DelayTypePopupService,
    DelayTypeComponent,
    DelayTypeDetailComponent,
    DelayTypeDialogComponent,
    DelayTypePopupComponent,
    DelayTypeDeletePopupComponent,
    DelayTypeDeleteDialogComponent,
    delayTypeRoute,
    delayTypePopupRoute,
    DelayTypeResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...delayTypeRoute,
    ...delayTypePopupRoute,
];

@NgModule({
    imports: [
        LineGatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DelayTypeComponent,
        DelayTypeDetailComponent,
        DelayTypeDialogComponent,
        DelayTypeDeleteDialogComponent,
        DelayTypePopupComponent,
        DelayTypeDeletePopupComponent,
    ],
    entryComponents: [
        DelayTypeComponent,
        DelayTypeDialogComponent,
        DelayTypePopupComponent,
        DelayTypeDeleteDialogComponent,
        DelayTypeDeletePopupComponent,
    ],
    providers: [
        DelayTypeService,
        DelayTypePopupService,
        DelayTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LineGatewayDelayTypeModule {}
