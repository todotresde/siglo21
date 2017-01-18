import { Headers, RequestOptions } from '@angular/http';

export class Service {
	private headers : Headers = new Headers();
	private requestOptions = new RequestOptions();
	
	constructor() {
	    this.setHeader('X-Requested-With', 'XMLHttpRequest');
	}

	setHeader(key: string, value: string): void{
		this.headers.set(key, value);
		this.requestOptions.headers = this.getHeaders();
	}

	getHeaders(): Headers {
		return this.headers;
	}

	getRequestOptions(): RequestOptions{
		return this.requestOptions;
	}

}