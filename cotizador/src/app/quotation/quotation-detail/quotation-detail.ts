import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Quotation } from '../../quotation/quotation';
import { QuotationService } from '../quotation.service'
import { QuotationList } from '../quotation-list/quotation-list';
import { ProductSearch } from '../../product/product-search/product-search';

@Component({
  selector: 'quotation-detail',
  templateUrl: 'quotation-detail.html',
  providers: [QuotationService]
})
export class QuotationDetail {
  quotation: Quotation = new Quotation();
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private quotationService: QuotationService) {
    this.quotationService.get(navParams.get('id')).then(quotation => this.quotation = quotation);
  }

  addProduct(): void{
  	this.navCtrl.push(ProductSearch, {
      quotation: this.quotation
    });
  }

  save(quotation: Quotation): void{
  	this.quotationService.save(quotation).then(quotation => this.navCtrl.pop());
  } 
}
