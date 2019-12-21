import {InventarioRealResponse} from './InventarioRealResponse';
import {ProductHasZone} from '../../pojo/ProductHasZone';

export class GetRotationProjectedResponse extends InventarioRealResponse {
    public data: ProductHasZone[];

    constructor() {
        super();
        this.data = [];

    }
}
