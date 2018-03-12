import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sfi2SharedModule } from '../../shared';
import {
    ManufacturingOrderService,
    ManufacturingOrderPopupService,
    ManufacturingOrderComponent,
    ManufacturingOrderDetailComponent,
    ManufacturingOrderDialogComponent,
    ManufacturingOrderPopupComponent,
    ManufacturingOrderDeletePopupComponent,
    ManufacturingOrderSendPopupComponent,
    ManufacturingOrderDeleteDialogComponent,
    ManufacturingOrderSendDialogComponent,
    manufacturingOrderRoute,
    manufacturingOrderPopupRoute,
} from './';

const ENTITY_STATES = [
    ...manufacturingOrderRoute,
    ...manufacturingOrderPopupRoute,
];

@NgModule({
    imports: [
        Sfi2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ManufacturingOrderComponent,
        ManufacturingOrderDetailComponent,
        ManufacturingOrderDialogComponent,
        ManufacturingOrderDeleteDialogComponent,
        ManufacturingOrderSendDialogComponent,
        ManufacturingOrderPopupComponent,
        ManufacturingOrderDeletePopupComponent,
        ManufacturingOrderSendPopupComponent,
    ],
    entryComponents: [
        ManufacturingOrderComponent,
        ManufacturingOrderDialogComponent,
        ManufacturingOrderPopupComponent,
        ManufacturingOrderDeleteDialogComponent,
        ManufacturingOrderSendDialogComponent,
        ManufacturingOrderDeletePopupComponent,
        ManufacturingOrderSendPopupComponent,
    ],
    providers: [
        ManufacturingOrderService,
        ManufacturingOrderPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Sfi2ManufacturingOrderModule {}
