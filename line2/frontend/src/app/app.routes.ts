import { Routes } from '@angular/router';

import { LoginRoutes } from './login/login.routes';
//import { SignupRoutes } from './signup/signup.routes';
import { ModulesRoutes } from './modules/modules.routes';

import { LoginComponent } from './login/login.component';

export const routes: Routes = [
	...LoginRoutes,
	//...SignupRoutes,
	...ModulesRoutes,
	{ path: '**', component: LoginComponent }
];
