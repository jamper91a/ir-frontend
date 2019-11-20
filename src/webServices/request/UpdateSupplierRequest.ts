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
        if (!this.name) {
            throw Error ('fields_empty');
        }
        return true;
    }

    clean() {
        this.name = '';
    }


}
