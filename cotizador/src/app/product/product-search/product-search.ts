import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Product } from '../../product/product';
import { Quotation } from '../../quotation/quotation';
import { QuotationDetail } from '../../quotation/quotation-detail/quotation-detail'

@Component({
  selector: 'product-search',
  templateUrl: 'product-search.html'
})
export class ProductSearch {
  quotation: Quotation;
  allProducts: Product[];
  products: Product[] = [];
  selectedProducts: Product[] = [];
  searchText: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.allProducts = [
    	new Product("1","Alarma 1",0,10),
    	new Product("2","Alarma 2",0,20),
    	new Product("3","Sensor 1",0,30),
    	new Product("4","Sensor 2",0,40),
    ];
    this.quotation = navParams.get('quotation');
  }

  search(searchText: string):void{
  	this.products = this.allProducts.filter(product => product.description.indexOf(searchText) !== -1);
  }

  add(product: Product): void{
  	this.selectedProducts.push(product);
  	this.searchText = "";
  	this.products = [];
  }

  addProducts(products: Product[]): void{
  	this.navCtrl.push(QuotationDetail, {
  		quotation: this.quotation,
  		products: products
  	});
  } 
}
