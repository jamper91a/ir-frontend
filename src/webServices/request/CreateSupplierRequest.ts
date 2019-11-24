import {Supplier} from '../../pojo/Supplier';

export class CreateSupplierRequest implements InventarioRealRequest {
    public supplier: Supplier;
    constructor() {
        this.supplier = new Supplier();
    }

    getBody() {
        return this.supplier;
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.supplier.name) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean() {
        this.supplier.name = '';
    }


}
