import { MO } from '../m-o';
import { Line } from '../line';
import { WS } from '../w-s';
import { MOProduct } from '../m-o-product';
import { MOCustomProduct } from '../m-o-custom-product';
import { Delay } from '../delay';
export class Tracing {
    constructor(
        public id?: number,
        public code?: string,
        public inTime?: any,
        public startTime?: any,
        public time?: number,
        public status?: number,
        public mO?: MO,
        public line?: Line,
        public wS?: WS,
        public nextWS?: WS,
        public prevWS?: WS,
        public mOProduct?: MOProduct,
        public mOCustomProduct?: MOCustomProduct,
        public nextTracing?: Tracing,
        public prevTracing?: Tracing,
        public delay?: Delay,
    ) {
    }
}
