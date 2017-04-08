import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LineGatewayProductModule } from './product/product.module';
import { LineGatewayProductTypeModule } from './product-type/product-type.module';
import { LineGatewayDelayModule } from './delay/delay.module';
import { LineGatewayDelayTypeModule } from './delay-type/delay-type.module';
import { LineGatewayLineModule } from './line/line.module';
import { LineGatewayMOModule } from './m-o/mo.module';
import { LineGatewayMOCustomProductModule } from './m-o-custom-product/mo-custom-product.module';
import { LineGatewayMOProductModule } from './m-o-product/mo-product.module';
import { LineGatewayTracingModule } from './tracing/tracing.module';
import { LineGatewayWSModule } from './w-s/ws.module';
import { LineGatewayWSConfigurationModule } from './w-s-configuration/ws-configuration.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        LineGatewayProductModule,
        LineGatewayProductTypeModule,
        LineGatewayDelayModule,
        LineGatewayDelayTypeModule,
        LineGatewayLineModule,
        LineGatewayMOModule,
        LineGatewayMOCustomProductModule,
        LineGatewayMOProductModule,
        LineGatewayTracingModule,
        LineGatewayWSModule,
        LineGatewayWSConfigurationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LineGatewayEntityModule {}
