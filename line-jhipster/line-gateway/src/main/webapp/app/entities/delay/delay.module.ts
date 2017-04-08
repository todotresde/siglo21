import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LineGatewaySharedModule } from '../../shared';

import {
    DelayService,
    DelayPopupService,
    DelayComponent,
    DelayDetailComponent,
    DelayDialogComponent,
    DelayPopupComponent,
    DelayDeletePopupComponent,
    DelayDeleteDialogComponent,
    delayRoute,
    delayPopupRoute,
} from './';

let ENTITY_STATES = [
    ...delayRoute,
    ...delayPopupRoute,
];

@NgModule({
    imports: [
        LineGatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DelayComponent,
        DelayDetailComponent,
        DelayDialogComponent,
        DelayDeleteDialogComponent,
        DelayPopupComponent,
        DelayDeletePopupComponent,
    ],
    entryComponents: [
        DelayComponent,
        DelayDialogComponent,
        DelayPopupComponent,
        DelayDeleteDialogComponent,
        DelayDeletePopupComponent,
    ],
    providers: [
        DelayService,
        DelayPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LineGatewayDelayModule {}
