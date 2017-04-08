import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LineGatewaySharedModule } from '../../shared';

import {
    MOService,
    MOPopupService,
    MOComponent,
    MODetailComponent,
    MODialogComponent,
    MOPopupComponent,
    MODeletePopupComponent,
    MODeleteDialogComponent,
    mORoute,
    mOPopupRoute,
} from './';

let ENTITY_STATES = [
    ...mORoute,
    ...mOPopupRoute,
];

@NgModule({
    imports: [
        LineGatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MOComponent,
        MODetailComponent,
        MODialogComponent,
        MODeleteDialogComponent,
        MOPopupComponent,
        MODeletePopupComponent,
    ],
    entryComponents: [
        MOComponent,
        MODialogComponent,
        MOPopupComponent,
        MODeleteDialogComponent,
        MODeletePopupComponent,
    ],
    providers: [
        MOService,
        MOPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LineGatewayMOModule {}
