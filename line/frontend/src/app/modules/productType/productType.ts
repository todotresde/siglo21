import { Commons } from 'app/shared';

export class ProductType {
    id: number = Commons.generateId();
    name: string = "";
    hasWidth: boolean = false;
    hasHeight: boolean = false;
}
