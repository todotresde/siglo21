import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { DelayTypeComponent } from './delayType.component';
import { DelayTypeListComponent } from './delayType-list/delayType-list.component';
import { DelayTypeDetailComponent } from './delayType-detail/delayType-detail.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, SharedModule],
    declarations: [DelayTypeComponent, DelayTypeListComponent, DelayTypeDetailComponent],
    exports: [DelayTypeComponent, DelayTypeListComponent, DelayTypeDetailComponent]
})

export class DelayTypeModule { }
