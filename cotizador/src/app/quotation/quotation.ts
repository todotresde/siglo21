import { Client } from '../client/client';
import { Product } from '../product/product';

export class Quotation {
	id: number = Math.round(Math.random()*100000);
	description: string;
	client: Client = new Client();
	products : Product[] = [];
	total: number = 0;

}