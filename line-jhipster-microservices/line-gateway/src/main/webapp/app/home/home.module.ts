import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LineGatewaySharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';


@NgModule({
    imports: [
        LineGatewaySharedModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true })
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LineGatewayHomeModule {}
