import {Product} from '../../pojo/Product';

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
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.products) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean() {
        this.products = [];
    }


}
