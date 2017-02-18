import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';

import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
    imports: [SharedModule],
    declarations: [UserComponent, UserListComponent, UserDetailComponent],
    exports: [UserComponent, UserListComponent, UserDetailComponent]
})

export class UserModule { }
