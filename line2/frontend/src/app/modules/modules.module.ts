import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesComponent } from './modules.component';
import { RouterModule } from '@angular/router';

import {TopbarComponent} from '../layout/topbar/topbar.component';
import {SidebarComponent} from '../layout/sidebar/sidebar.component';

import { UserModule } from './user/user.module';
import { WorkStationModule } from './workStation/workStation.module';
import { ProductTypeModule } from './productType/productType.module';
import { LineModule } from './line/line.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UserModule,
    WorkStationModule,
    ProductTypeModule,
    LineModule
  ],
  declarations: [ModulesComponent, TopbarComponent, SidebarComponent]
})
export class ModulesModule { }
