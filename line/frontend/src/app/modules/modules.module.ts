import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Http } from '@angular/http';

import { LayoutModule } from '../layout/layout.module';
import { LineModule } from './line/line.module';
import { ProductModule } from './product/product.module';
import { ProductTypeModule } from './productType/productType.module';
import { UserModule } from './user/user.module';
import { WorkStationModule } from './workStation/workStation.module';
import { ManufacturingOrderModule } from './manufacturingOrder/manufacturingOrder.module';

import { ModulesComponent } from './modules.component';
@NgModule({
  imports: [
    LayoutModule,
    CommonModule,
    RouterModule,
    UserModule,
    WorkStationModule,
    ProductModule,
    ProductTypeModule,
    LineModule,
    ManufacturingOrderModule
  ],
  declarations: [ModulesComponent]
})
export class ModulesModule {
}
