import { Shared } from '../../shared/shared';

export class WorkStation {
    id: number = Shared.generateId();
    name: string;
    ip: string;
}
