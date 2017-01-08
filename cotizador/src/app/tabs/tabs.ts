import { Component } from '@angular/core';

import { QuotationList } from '../quotation/quotation-list/quotation-list';
import { ClientList } from '../client/client-list/client-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  quotations: any = QuotationList;
  clients: any = ClientList;

  constructor() {

  }
}