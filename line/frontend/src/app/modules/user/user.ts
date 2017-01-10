import { Shared } from '../../shared/shared';

export class User {
    id: number = Shared.generateId();
    name: string;
}
