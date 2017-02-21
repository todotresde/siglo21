import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';

import { LayoutComponent } from './layout.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [SharedModule],
  declarations: [LayoutComponent, SidebarComponent, TopbarComponent],
  exports: [LayoutComponent, SidebarComponent, TopbarComponent]
})
export class LayoutModule { }
