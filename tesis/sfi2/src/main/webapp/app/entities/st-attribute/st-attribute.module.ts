import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sfi2SharedModule } from '../../shared';
import {
    STAttributeService,
    STAttributePopupService,
    STAttributeComponent,
    STAttributeDetailComponent,
    STAttributeDialogComponent,
    STAttributePopupComponent,
    STAttributeDeletePopupComponent,
    STAttributeDeleteDialogComponent,
    sTAttributeRoute,
    sTAttributePopupRoute,
} from './';

const ENTITY_STATES = [
    ...sTAttributeRoute,
    ...sTAttributePopupRoute,
];

@NgModule({
    imports: [
        Sfi2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        STAttributeComponent,
        STAttributeDetailComponent,
        STAttributeDialogComponent,
        STAttributeDeleteDialogComponent,
        STAttributePopupComponent,
        STAttributeDeletePopupComponent,
    ],
    entryComponents: [
        STAttributeComponent,
        STAttributeDialogComponent,
        STAttributePopupComponent,
        STAttributeDeleteDialogComponent,
        STAttributeDeletePopupComponent,
    ],
    providers: [
        STAttributeService,
        STAttributePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Sfi2STAttributeModule {}
