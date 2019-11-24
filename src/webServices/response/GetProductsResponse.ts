import {Product} from '../../pojo/Product';
import {InventarioRealResponse} from './InventarioRealResponse';

export class GetProductsResponse extends InventarioRealResponse {
    public data: Product[];
}
