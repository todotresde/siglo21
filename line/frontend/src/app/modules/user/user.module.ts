import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule, SharedModule],
    declarations: [UserComponent, UserListComponent, UserDetailComponent],
    exports: [UserComponent, UserListComponent, UserDetailComponent]
})

export class UserModule { }
