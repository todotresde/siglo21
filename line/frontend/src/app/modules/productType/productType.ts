import { Shared } from '../../shared/shared';

export class ProductType {
    id: number = Shared.generateId();
    name: string = "";
    hasWidth: boolean = false;
    hasHeight: boolean = false;
}
