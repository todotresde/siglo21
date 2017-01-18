import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Quotation } from './quotation';

@Injectable()
export class QuotationService {
  temporalQuotation: Quotation;
  quotations: Quotation[] = [];

  constructor(private http: Http) { }

  getAll(): Promise<Quotation[]> {
  	return new Promise((resolve, reject) => {
	    resolve(this.quotations);
	});
  }

  get(id: Number): Promise<Quotation> {
    let result: Quotation[] = this.quotations.filter(q => q.id === id);
    let quotation: Quotation;

    if(result.length > 0){
    	quotation = result[0];
    }else{
    	quotation = new Quotation();
    }

    return new Promise((resolve, reject) => {
	    resolve(quotation);
	});
  }

  remove(quotation: Quotation): Promise<Quotation> {
    this.quotations = this.quotations.filter(q => q.id !== quotation.id);

    return new Promise((resolve, reject) => {
	    resolve(quotation);
	});
  }

  save(quotation: Quotation): Promise<Quotation> {
  	this.quotations.push(quotation);

    return new Promise((resolve, reject) => {
	    resolve(quotation);
	  });
  }

  //*************************************************************

  newTemporal(): Quotation{
    this.temporalQuotation = new Quotation();
    return this.temporalQuotation;
  }

  getTemporal(): Quotation{
    if(!this.temporalQuotation) this.newTemporal();
    return this.temporalQuotation;
  }
}