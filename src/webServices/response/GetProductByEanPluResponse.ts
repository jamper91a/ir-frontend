import {Product} from '../../pojo/Product';
import {InventarioRealResponse} from './InventarioRealResponse';

export class GetProductByEanPluResponse extends InventarioRealResponse {
    public data: Product;
}
