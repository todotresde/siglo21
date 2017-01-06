import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'quotation-detail',
  templateUrl: 'quotation-detail.html'
})
export class QuotationDetail {
  quotation: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.quotation = navParams.get('quotation');
  }
}
