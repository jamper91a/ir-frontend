import {InventarioRealResponse} from './InventarioRealResponse';
import {ProductHasZone} from '../../pojo/ProductHasZone';

export class GetReturnReportResponse extends InventarioRealResponse {
    public data: ProductHasZone[];

    constructor() {
        super();
        this.data = [];

    }
}
