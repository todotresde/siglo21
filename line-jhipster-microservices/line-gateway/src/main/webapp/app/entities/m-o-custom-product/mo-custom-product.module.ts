import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LineGatewaySharedModule } from '../../shared';

import {
    MOCustomProductService,
    MOCustomProductPopupService,
    MOCustomProductComponent,
    MOCustomProductDetailComponent,
    MOCustomProductDialogComponent,
    MOCustomProductPopupComponent,
    MOCustomProductDeletePopupComponent,
    MOCustomProductDeleteDialogComponent,
    mOCustomProductRoute,
    mOCustomProductPopupRoute,
} from './';

let ENTITY_STATES = [
    ...mOCustomProductRoute,
    ...mOCustomProductPopupRoute,
];

@NgModule({
    imports: [
        LineGatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MOCustomProductComponent,
        MOCustomProductDetailComponent,
        MOCustomProductDialogComponent,
        MOCustomProductDeleteDialogComponent,
        MOCustomProductPopupComponent,
        MOCustomProductDeletePopupComponent,
    ],
    entryComponents: [
        MOCustomProductComponent,
        MOCustomProductDialogComponent,
        MOCustomProductPopupComponent,
        MOCustomProductDeleteDialogComponent,
        MOCustomProductDeletePopupComponent,
    ],
    providers: [
        MOCustomProductService,
        MOCustomProductPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LineGatewayMOCustomProductModule {}
