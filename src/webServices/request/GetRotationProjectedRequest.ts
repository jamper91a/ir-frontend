import {Product} from '../../pojo/Product';

export class GetRotationProjectedRequest implements InventarioRealRequest {
    public product: Product;
    public days: number;
    public total: number;


    constructor() {
        this.days = 0;
    }

    getBody() {
        return {
            product_id: this.product.id,
            days: this.days
        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.product || this.days === 0) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean() {
    }


}
