import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';

import { DelayComponent } from './delay.component';
import { DelayListComponent } from './delay-list/delay-list.component';
import { DelayDetailComponent } from './delay-detail/delay-detail.component';

@NgModule({
    imports: [SharedModule],
    declarations: [DelayComponent, DelayListComponent, DelayDetailComponent],
    exports: [DelayComponent, DelayListComponent, DelayDetailComponent]
})

export class DelayModule { }
