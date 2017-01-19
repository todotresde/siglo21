import { Shared } from '../../shared/shared';

export class Role {
    id: number = Shared.generateId();
    name: string = "";
    description: string = "";
}
