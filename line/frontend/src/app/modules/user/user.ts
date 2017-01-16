import { Shared } from '../../shared/shared';

export class User {
    id: number = Shared.generateId();
    username: string;
    name: string = "";
    password: string;
    email: string;
}
