import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Quotation } from '../../quotation/quotation';
import { QuotationList } from '../quotation-list/quotation-list';
import { ProductSearch } from '../../product/product-search/product-search';

@Component({
  selector: 'quotation-detail',
  templateUrl: 'quotation-detail.html'
})
export class QuotationDetail {
  quotation: Quotation;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.quotation = navParams.get('quotation');

    if(navParams.get('products')){
    	this.quotation.products = navParams.get('products');
    }
  }

  addProduct(): void{
  	this.navCtrl.push(ProductSearch, {
      quotation: this.quotation
    });
  }

  save(quotation: Quotation): void{
  	this.navCtrl.push(QuotationList,{
  		quotation: quotation
  	});
  } 
}
