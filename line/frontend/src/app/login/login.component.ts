import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from './login.service';

import { Message } from '../shared/message/message';

@Component({
	moduleId: "login",
	selector: 'login-cmp',
	templateUrl: './login.component.html',
	providers:[LoginService]
})

export class LoginComponent { 
	message: Message = new Message();
	username: string = "";
	password: string = "";

	constructor(private router: Router, private r:ActivatedRoute, private loginService: LoginService){

	}

	login(username: string, password: string): void{
		this.loginService.getToken()
			.then( response => {
				this.loginService.setHeader('X-Auth-Token', response.token);

				this.loginService.get(username, password)
					.then(user => this.router.navigate(['./modules'],{ relativeTo: this.r }))
					.catch(error => {
						this.message.error("invalid-username-password");
					})
			})
			.catch(error => {
				this.message.error("invalid-username-password");
			})	
	}
}
