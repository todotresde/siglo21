export class Product {
	code: string;
	description : string;
	costPrice: number = 0;
	price: number = 0;

	constructor(code: string, description: string, costPrice: number = 0, price: number){
		this.code = code;
		this.description = description;
		this.costPrice = costPrice;
		this.price = price;
	}
}