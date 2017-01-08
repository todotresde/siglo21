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
      this.quotations.push(<Quotation>navParams.get('quotation'));
    }
  }

  select(event, quotation): void {
    this.navCtrl.push(QuotationDetail, {
      quotation: quotation
    });
  }

  addQuotation(event): void {
    this.navCtrl.push(QuotationDetail, {
      quotation: new Quotation()
    });
  }

  remove(event, quotation: Quotation): void {
    this.quotations = this.quotations.filter(q => q.description !== quotation.description);
  }
}
