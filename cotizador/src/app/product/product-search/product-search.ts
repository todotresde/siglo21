import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, NavParams } from 'ionic-angular';

import { Product } from '../../product/product';
import { Quotation } from '../../quotation/quotation';
import { QuotationService } from '../../quotation/quotation.service'
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private quotationService: QuotationService) {
    this.getAllProducts().then(products => {this.allProducts = products});
    
    this.quotation = navParams.get('quotation');
  }

  search(searchText: string):void{
  	this.products = this.allProducts.filter(product => product.description.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }

  add(product: Product): void{
  	this.selectedProducts.push(product);
  	this.searchText = "";
  	this.products = [];
  }

  addProducts(products: Product[]): void{
    this.quotationService.getTemporal().products = products;
  	this.navCtrl.pop();
  } 

  getAllProducts(): Promise<Product[]>{
    return this.http.get("../../../assets/price-list/17012017.json")
               .map(response => response.json() as Product[])
               .toPromise();
  }
}
