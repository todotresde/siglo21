import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LineGatewaySharedModule } from '../../shared';

import {
    WSConfigurationService,
    WSConfigurationPopupService,
    WSConfigurationComponent,
    WSConfigurationDetailComponent,
    WSConfigurationDialogComponent,
    WSConfigurationPopupComponent,
    WSConfigurationDeletePopupComponent,
    WSConfigurationDeleteDialogComponent,
    wSConfigurationRoute,
    wSConfigurationPopupRoute,
} from './';

let ENTITY_STATES = [
    ...wSConfigurationRoute,
    ...wSConfigurationPopupRoute,
];

@NgModule({
    imports: [
        LineGatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        WSConfigurationComponent,
        WSConfigurationDetailComponent,
        WSConfigurationDialogComponent,
        WSConfigurationDeleteDialogComponent,
        WSConfigurationPopupComponent,
        WSConfigurationDeletePopupComponent,
    ],
    entryComponents: [
        WSConfigurationComponent,
        WSConfigurationDialogComponent,
        WSConfigurationPopupComponent,
        WSConfigurationDeleteDialogComponent,
        WSConfigurationDeletePopupComponent,
    ],
    providers: [
        WSConfigurationService,
        WSConfigurationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LineGatewayWSConfigurationModule {}
