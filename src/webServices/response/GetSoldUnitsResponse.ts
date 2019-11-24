import {InventarioRealResponse} from './InventarioRealResponse';
import {ProductHasZone} from '../../pojo/ProductHasZone';

export class GetSoldUnitsResponse extends InventarioRealResponse {
    public data: {
        saleUnits: ProductHasZone[],
        returnedUnits: ProductHasZone[],
    };

    constructor() {
        super();
        this.data = {
            saleUnits: [],
            returnedUnits: [],
        };

    }
}
