import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';

import { RoleComponent } from './role.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';

@NgModule({
    imports: [SharedModule],
    declarations: [RoleComponent, RoleListComponent, RoleDetailComponent],
    exports: [RoleComponent, RoleListComponent, RoleDetailComponent]
})

export class RoleModule { }
