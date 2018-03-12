import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Sfi2EmployeeModule } from './employee/employee.module';
import { Sfi2LineModule } from './line/line.module';
import { Sfi2WSConfigurationModule } from './ws-configuration/ws-configuration.module';
import { Sfi2WorkStationModule } from './work-station/work-station.module';
import { Sfi2ManufacturingOrderModule } from './manufacturing-order/manufacturing-order.module';
import { Sfi2MOProductModule } from './mo-product/mo-product.module';
import { Sfi2SupplyModule } from './supply/supply.module';
import { Sfi2SupplyTypeModule } from './supply-type/supply-type.module';
import { Sfi2STAttributeModule } from './st-attribute/st-attribute.module';
import { Sfi2ProductModule } from './product/product.module';
import { Sfi2ProductTypeModule } from './product-type/product-type.module';
import { Sfi2PTAttributeModule } from './pt-attribute/pt-attribute.module';
import { Sfi2TracerModule } from './tracer/tracer.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Sfi2EmployeeModule,
        Sfi2LineModule,
        Sfi2WSConfigurationModule,
        Sfi2WorkStationModule,
        Sfi2ManufacturingOrderModule,
        Sfi2MOProductModule,
        Sfi2SupplyModule,
        Sfi2SupplyTypeModule,
        Sfi2STAttributeModule,
        Sfi2ProductModule,
        Sfi2ProductTypeModule,
        Sfi2PTAttributeModule,
        Sfi2TracerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Sfi2EntityModule {}
