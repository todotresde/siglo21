import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Client } from '../../client/client';
import { ClientList } from '../client-list/client-list';
import { ProductSearch } from '../../product/product-search/product-search';

@Component({
  selector: 'client-detail',
  templateUrl: 'client-detail.html'
})
export class ClientDetail {
  client: Client;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.client = navParams.get('client');
  }

  addProduct(): void{
  	this.navCtrl.push(ProductSearch, {
      client: this.client
    });
  }

  save(client: Client): void{
  	this.navCtrl.push(ClientList,{
  		client: client
  	});
  } 
}
