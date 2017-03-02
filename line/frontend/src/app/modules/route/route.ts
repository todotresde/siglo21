import { Commons } from 'app/shared';

export class Route {
    id: number = Commons.generateId();
    name: string = "";
    description: string = "";
}
