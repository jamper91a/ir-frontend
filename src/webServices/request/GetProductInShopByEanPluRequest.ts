import {Employee} from '../../pojo/Employee';

export class GetProductInShopByEanPluRequest implements InventarioRealRequest {
    public product: string;
    public employee: Employee;


    constructor() {
        this.product = '';
    }

    getBody() {
        return {
            product: this.product,
            employee: this.employee
        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.product) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean() {
    }



}
