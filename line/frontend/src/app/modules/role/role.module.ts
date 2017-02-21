import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from 'app/shared';

import { RoleComponent } from './role.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, SharedModule],
    declarations: [RoleComponent, RoleListComponent, RoleDetailComponent],
    exports: [RoleComponent, RoleListComponent, RoleDetailComponent]
})

export class RoleModule { }
