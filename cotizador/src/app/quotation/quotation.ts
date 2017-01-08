import { Client } from '../client/client';
import { Product } from '../product/product';

export class Quotation {
	client: Client = new Client();
	products : Product[] = [];
	total: number = 0;

}