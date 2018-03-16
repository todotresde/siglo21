import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sfi2SharedModule } from '../../shared';
import {
    STAttributeValueService,
    STAttributeValuePopupService,
    STAttributeValueComponent,
    STAttributeValueDetailComponent,
    STAttributeValueDialogComponent,
    STAttributeValuePopupComponent,
    STAttributeValueDeletePopupComponent,
    STAttributeValueDeleteDialogComponent,
    sTAttributeValueRoute,
    sTAttributeValuePopupRoute,
} from './';

const ENTITY_STATES = [
    ...sTAttributeValueRoute,
    ...sTAttributeValuePopupRoute,
];

@NgModule({
    imports: [
        Sfi2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        STAttributeValueComponent,
        STAttributeValueDetailComponent,
        STAttributeValueDialogComponent,
        STAttributeValueDeleteDialogComponent,
        STAttributeValuePopupComponent,
        STAttributeValueDeletePopupComponent,
    ],
    entryComponents: [
        STAttributeValueComponent,
        STAttributeValueDialogComponent,
        STAttributeValuePopupComponent,
        STAttributeValueDeleteDialogComponent,
        STAttributeValueDeletePopupComponent,
    ],
    providers: [
        STAttributeValueService,
        STAttributeValuePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Sfi2STAttributeValueModule {}
