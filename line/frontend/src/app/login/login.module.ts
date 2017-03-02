import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';

import { LoginComponent } from './login.component';

@NgModule({
    imports: [SharedModule],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})

export class LoginModule { }
