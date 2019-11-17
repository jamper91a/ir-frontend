import {Shop} from '../../pojo/Shop';

export class UpdateShopRequest implements InventarioRealRequest {
    public id = '';
    public name = '';

    constructor() {
    }

    putData(shop: Shop) {
        this.name = shop.name;
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
