import { Shared } from '../../shared/shared';

import { Role } from '../role/role';

export class User {
    id: number = Shared.generateId();
    username: string;
    name: string = "";
    password: string;
    email: string;
    roles: Role[] = [];
}
