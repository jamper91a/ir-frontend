import {ProductHasZone} from '../../pojo/ProductHasZone';
import {InventarioRealResponse} from './InventarioRealResponse';

export class GetProductInShopByEanPluResponse extends InventarioRealResponse {
    public data: ProductHasZone[];

    constructor() {
        super();
        this.data = [];

    }
}
