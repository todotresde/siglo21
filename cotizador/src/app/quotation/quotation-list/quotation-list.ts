import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { QuotationDetail } from '../quotation-detail/quotation-detail'

@Component({
  selector: 'quotation-list',
  templateUrl: 'quotation-list.html'
})
export class QuotationList {
  quotations: Array<{title: string, note: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.quotations = [];
    for (let i = 1; i < 11; i++) {
      this.quotations.push({
        title: 'Item ' + i,
        note: 'This is quotation #' + i
      });
    }
  }

  itemTapped(event, quotation) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(QuotationDetail, {
      quotation: quotation
    });
  }
}
