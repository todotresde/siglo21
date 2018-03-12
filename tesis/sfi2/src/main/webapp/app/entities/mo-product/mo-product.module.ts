import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sfi2SharedModule } from '../../shared';
import {
    MOProductService,
    MOProductPopupService,
    MOProductComponent,
    MOProductDetailComponent,
    MOProductDialogComponent,
    MOProductPopupComponent,
    MOProductDeletePopupComponent,
    MOProductDeleteDialogComponent,
    mOProductRoute,
    mOProductPopupRoute,
} from './';

const ENTITY_STATES = [
    ...mOProductRoute,
    ...mOProductPopupRoute,
];

@NgModule({
    imports: [
        Sfi2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MOProductComponent,
        MOProductDetailComponent,
        MOProductDialogComponent,
        MOProductDeleteDialogComponent,
        MOProductPopupComponent,
        MOProductDeletePopupComponent,
    ],
    entryComponents: [
        MOProductComponent,
        MOProductDialogComponent,
        MOProductPopupComponent,
        MOProductDeleteDialogComponent,
        MOProductDeletePopupComponent,
    ],
    providers: [
        MOProductService,
        MOProductPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Sfi2MOProductModule {}
