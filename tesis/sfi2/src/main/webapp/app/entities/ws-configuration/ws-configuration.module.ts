import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sfi2SharedModule } from '../../shared';
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

const ENTITY_STATES = [
    ...wSConfigurationRoute,
    ...wSConfigurationPopupRoute,
];

@NgModule({
    imports: [
        Sfi2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
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
export class Sfi2WSConfigurationModule {}
