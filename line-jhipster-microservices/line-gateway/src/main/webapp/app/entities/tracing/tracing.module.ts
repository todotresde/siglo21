import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LineGatewaySharedModule } from '../../shared';

import {
    TracingService,
    TracingPopupService,
    TracingComponent,
    TracingDetailComponent,
    TracingDialogComponent,
    TracingPopupComponent,
    TracingDeletePopupComponent,
    TracingDeleteDialogComponent,
    tracingRoute,
    tracingPopupRoute,
} from './';

let ENTITY_STATES = [
    ...tracingRoute,
    ...tracingPopupRoute,
];

@NgModule({
    imports: [
        LineGatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TracingComponent,
        TracingDetailComponent,
        TracingDialogComponent,
        TracingDeleteDialogComponent,
        TracingPopupComponent,
        TracingDeletePopupComponent,
    ],
    entryComponents: [
        TracingComponent,
        TracingDialogComponent,
        TracingPopupComponent,
        TracingDeleteDialogComponent,
        TracingDeletePopupComponent,
    ],
    providers: [
        TracingService,
        TracingPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LineGatewayTracingModule {}
