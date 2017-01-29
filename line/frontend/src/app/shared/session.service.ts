import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

    session = {};

    set(key:string, value:any) {
        this.session[key]= value;
    }

    get(key:string) {
        return this.session[key];
    }

    has(key:string) {
        if(this.get(key)) return true;
        return false;
    }

    remove(key:string) {         
        this.session[key]=null;
    }
}