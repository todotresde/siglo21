import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LayoutComponent } from './layout.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
//import { ModulesComponent } from '../modules/modules.component';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule],
  declarations: [LayoutComponent, SidebarComponent, TopbarComponent],
  exports: [LayoutComponent, SidebarComponent, TopbarComponent]
})
export class LayoutModule { }
