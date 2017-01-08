import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Quotation } from '../quotation'
import { QuotationDetail } from '../quotation-detail/quotation-detail'

@Component({
  selector: 'quotation-list',
  templateUrl: 'quotation-list.html'
})
export class QuotationList {
  quotations: Quotation[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(navParams.get('quotation')){
      this.quotations.push(navParams.get('quotation'));
    }
  }

  select(event, quotation) {
    this.navCtrl.push(QuotationDetail, {
      quotation: quotation
    });
  }

  addQuotation(event) {
    this.navCtrl.push(QuotationDetail, {
      quotation: new Quotation()
    });
  }
}
