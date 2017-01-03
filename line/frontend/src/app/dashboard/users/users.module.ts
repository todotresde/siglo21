import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './users.component';

@NgModule({
    imports: [RouterModule,CommonModule],
    declarations: [UsersComponent],
    exports: [UsersComponent]
})

export class UsersModule { }
