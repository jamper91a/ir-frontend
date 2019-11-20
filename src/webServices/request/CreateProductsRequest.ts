import {Product} from '../../pojo/Product';
import {Supplier} from '../../pojo/Supplier';

export class CreateProductsRequest implements InventarioRealRequest {
    public products: Product[] = [];

    constructor() {
        this.clean();
    }

    getBody() {
        return {
            products: this.products
        };
    }

    validate(): boolean {
        if (!this.products) {
            throw Error ('fields_empty');
        }
        return true;
    }

    clean() {
        this.products = [];
    }


}
