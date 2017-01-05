import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesComponent } from './modules.component';
import { RouterModule } from '@angular/router';

import {TopbarComponent} from '../layout/topbar/topbar.component';
import {SidebarComponent} from '../layout/sidebar/sidebar.component';

import { LineModule } from './line/line.module';
import { ProductModule } from './product/product.module';
import { ProductTypeModule } from './productType/productType.module';
import { UserModule } from './user/user.module';
import { WorkStationModule } from './workStation/workStation.module';
import { ManufacturingOrderModule } from './manufacturingOrder/manufacturingOrder.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UserModule,
    WorkStationModule,
    ProductModule,
    ProductTypeModule,
    LineModule,
    ManufacturingOrderModule
  ],
  declarations: [ModulesComponent, TopbarComponent, SidebarComponent]
})
export class ModulesModule { }
