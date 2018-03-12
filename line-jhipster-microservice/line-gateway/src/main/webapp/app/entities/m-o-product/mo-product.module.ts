import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LineGatewaySharedModule } from '../../shared';

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
    MOProductResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...mOProductRoute,
    ...mOProductPopupRoute,
];

@NgModule({
    imports: [
        LineGatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
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
        MOProductResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LineGatewayMOProductModule {}
