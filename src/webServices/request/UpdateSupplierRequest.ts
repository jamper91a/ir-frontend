import {Supplier} from '../../pojo/Supplier';

export class UpdateSupplierRequest implements InventarioRealRequest {
    public id = '';
    public name = '';

    constructor() {
    }

    putData(supplier: Supplier) {
        this.name = supplier.name;
        this.id = supplier.id + '';
    }

    getBody() {
        return {
            name: this.name

        };
    }

    validate(): boolean {
        const error = new Error();
        // @ts-ignore
        error.code = 'VAL_FAIL';
        if (!this.name) {
            error.message = 'fields_empty';
            throw error;
        }
        return true;
    }

    clean() {
        this.name = '';
    }


}
