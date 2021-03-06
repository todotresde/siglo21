import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from './login.service';

import { Message } from 'app/shared';

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
	/*
	login(username: string, password: string): void{
		this.loginService.login(username, password)
			.then(response => {
				this.router.navigate(['/modules'],{ relativeTo: this.r })
				this.loginService.getToken()
					.then( response => {
						this.loginService.setHeader('X-Auth-Token', response.token);
						this.loginService.setHeader("Authorization","Basic " + btoa(username + ":" + password));
    
						localStorage.setItem("X-Auth-Token", response.token);
						localStorage.setItem("Authorization","Basic " + btoa(username + ":" + password))
						
						this.router.navigate(['/modules'],{ relativeTo: this.r })
					})
					.catch(error => {
						this.message.error("error-invalid-username-password");
					})
			})
			.catch(error => {
				this.message.error("error-invalid-username-password");
			})
	}
	*/

	login(username: string, password: string): void{
		this.loginService.getToken()
			.then( response => {
				//localStorage.setItem("Cookie", "JSESSIONID="+response.sessionToken);
				localStorage.setItem("X-XSRF-TOKEN", response.sessionToken);

				this.loginService.login(username, password, response.csrfToken)
					.then(response => {
						this.router.navigate(['/modules'],{ relativeTo: this.r })
					})
					.catch(error => {
						this.message.error("error-invalid-username-password");
					})
			})
			.catch(error => {
				this.message.error("error-invalid-username-password");
			})
	}
}
