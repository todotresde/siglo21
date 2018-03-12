import { WS } from '../w-s';
import { Delay } from '../delay';
export class WSConfiguration {
    constructor(
        public id?: number,
        public first?: boolean,
        public last?: boolean,
        public wS?: WS,
        public prevWS?: WS,
        public nextWS?: WS,
        public delay?: Delay,
    ) {
        this.first = false;
        this.last = false;
    }
}
