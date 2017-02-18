import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';

import { DelayTypeComponent } from './delayType.component';
import { DelayTypeListComponent } from './delayType-list/delayType-list.component';
import { DelayTypeDetailComponent } from './delayType-detail/delayType-detail.component';

@NgModule({
    imports: [SharedModule],
    declarations: [DelayTypeComponent, DelayTypeListComponent, DelayTypeDetailComponent],
    exports: [DelayTypeComponent, DelayTypeListComponent, DelayTypeDetailComponent]
})

export class DelayTypeModule { }
