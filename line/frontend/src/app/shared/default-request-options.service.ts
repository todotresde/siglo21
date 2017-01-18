import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions } from '@angular/http';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {

  constructor() {
    super();

    // Set the default 'Content-Type' header
    this.headers.set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==');

  }
}

export const requestOptionsProvider = { provide: RequestOptions, useClass: DefaultRequestOptions };