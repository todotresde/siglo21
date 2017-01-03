import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule],
    declarations: [UserComponent],
    exports: [UserComponent]
})

export class UserModule { }
