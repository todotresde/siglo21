import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared';

import { RouteComponent } from './route.component';
import { RouteListComponent } from './route-list/route-list.component';
import { RouteDetailComponent } from './route-detail/route-detail.component';

@NgModule({
    imports: [SharedModule],
    declarations: [RouteComponent, RouteListComponent, RouteDetailComponent],
    exports: [RouteComponent, RouteListComponent, RouteDetailComponent]
})

export class RouteModule { }
