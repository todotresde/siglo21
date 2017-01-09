import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Quotation } from '../quotation'
import { QuotationService } from '../quotation.service'
import { QuotationDetail } from '../quotation-detail/quotation-detail'

@Component({
  selector: 'quotation-list',
  templateUrl: 'quotation-list.html',
  providers: [QuotationService]
})
export class QuotationList {
  quotations: Quotation[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private quotationService: QuotationService) {
    this.getAll();
  }

  getAll(): void{
    this.quotationService.getAll().then(quotations => this.quotations = quotations);
  }

  select(event, quotation): void {
    this.navCtrl.push(QuotationDetail, {
      id: quotation.id
    });
  }

  addQuotation(event): void {
    this.navCtrl.push(QuotationDetail, {
      quotation: new Quotation()
    });
  }

  remove(event, quotation: Quotation): void {
    this.quotationService.remove(quotation).then(quotation => {
      this.quotations = this.quotations.filter(q => q.id !== quotation.id);
    });
    
  }

  ionViewWillEnter(){
    this.getAll();
  }
}
