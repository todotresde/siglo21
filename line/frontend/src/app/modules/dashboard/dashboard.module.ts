import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from 'app/shared';

import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, SharedModule],
    declarations: [DashboardComponent],
    exports: [DashboardComponent]
})

export class DashboardModule { }
