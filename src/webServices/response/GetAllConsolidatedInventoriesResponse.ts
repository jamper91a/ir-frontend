import {ProductHasZone} from '../../pojo/ProductHasZone';
import {InventarioRealResponse} from './InventarioRealResponse';
import {ConsolidatedInventory} from '../../pojo/ConsolidatedInventory';

export class GetAllConsolidatedInventoriesResponse extends InventarioRealResponse {
    public data: ConsolidatedInventory[];

    constructor() {
        super();
        this.data = [];

    }
}
