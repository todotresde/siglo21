import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LineGatewaySharedModule } from '../../shared';

import {
    WSService,
    WSPopupService,
    WSComponent,
    WSDetailComponent,
    WSDialogComponent,
    WSPopupComponent,
    WSDeletePopupComponent,
    WSDeleteDialogComponent,
    wSRoute,
    wSPopupRoute,
} from './';

let ENTITY_STATES = [
    ...wSRoute,
    ...wSPopupRoute,
];

@NgModule({
    imports: [
        LineGatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        WSComponent,
        WSDetailComponent,
        WSDialogComponent,
        WSDeleteDialogComponent,
        WSPopupComponent,
        WSDeletePopupComponent,
    ],
    entryComponents: [
        WSComponent,
        WSDialogComponent,
        WSPopupComponent,
        WSDeleteDialogComponent,
        WSDeletePopupComponent,
    ],
    providers: [
        WSService,
        WSPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LineGatewayWSModule {}
