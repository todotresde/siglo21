import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Client } from '../client'
import { ClientDetail } from '../client-detail/client-detail'

@Component({
  selector: 'client-list',
  templateUrl: 'client-list.html'
})
export class ClientList {
  clients: Client[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(navParams.get('client')){
      this.clients.push(<Client>navParams.get('client'));
    }
  }

  select(event, client): void {
    this.navCtrl.push(ClientDetail, {
      client: client
    });
  }

  addClient(event): void {
    this.navCtrl.push(ClientDetail, {
      client: new Client()
    });
  }

  remove(event, client: Client): void {
    this.clients = this.clients.filter(c => c.name !== client.name);
  }
}
