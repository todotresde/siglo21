import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { DelayComponent } from './delay.component';
import { DelayListComponent } from './delay-list/delay-list.component';
import { DelayDetailComponent } from './delay-detail/delay-detail.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, SharedModule],
    declarations: [DelayComponent, DelayListComponent, DelayDetailComponent],
    exports: [DelayComponent, DelayListComponent, DelayDetailComponent]
})

export class DelayModule { }
