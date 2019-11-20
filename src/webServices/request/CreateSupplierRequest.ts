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
        if (!this.supplier.name) {
            throw Error ('fields_empty');
        }
        return true;
    }

    clean() {
        this.supplier.name = '';
    }


}
