import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sfi2SharedModule } from '../../shared';
import {
    SupplyTypeService,
    SupplyTypePopupService,
    SupplyTypeComponent,
    SupplyTypeDetailComponent,
    SupplyTypeDialogComponent,
    SupplyTypePopupComponent,
    SupplyTypeDeletePopupComponent,
    SupplyTypeDeleteDialogComponent,
    supplyTypeRoute,
    supplyTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...supplyTypeRoute,
    ...supplyTypePopupRoute,
];

@NgModule({
    imports: [
        Sfi2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SupplyTypeComponent,
        SupplyTypeDetailComponent,
        SupplyTypeDialogComponent,
        SupplyTypeDeleteDialogComponent,
        SupplyTypePopupComponent,
        SupplyTypeDeletePopupComponent,
    ],
    entryComponents: [
        SupplyTypeComponent,
        SupplyTypeDialogComponent,
        SupplyTypePopupComponent,
        SupplyTypeDeleteDialogComponent,
        SupplyTypeDeletePopupComponent,
    ],
    providers: [
        SupplyTypeService,
        SupplyTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Sfi2SupplyTypeModule {}
